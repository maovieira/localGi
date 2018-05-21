// This is a port and adaptation funcion from the original VB script  of the local Getis
// Ord statistic function created by M. Sawada from the Laboratory for Paleoclimatology
// and Climatology, Department of Geography, University of Ottawa
// Ottawa, Ontario, Canada K1N 6N5
// October 1999
// http://www.lpc.uottawa.ca/data/scripts/
//
// Ported, adapted and tested agaist Spencer Chainey paper and also ArcGIS Pro 2.1.2 results
// by Marco Vieira, maovieira@gmail.com
// May 2018
// https://www.linkedin.com/in/maovieira
//
// Function GetisOrdGi(xyz(), inputmaxDist, MissingData)
//
// Purpose: To calculate local Getis-Ord statistic for an 2-D array (xyz()) xyz[i][1] = X, xyz[i][2] = Y, xyz[i][3] = Z).
//
// Input:  xyz() is a 2d array with XYZ data see Purpose
//         inputmaxdist: the current lag distance chosen by user
//         MissingDataCode: the numeric code to signify that the current point has no variance && so Ci cannot be calculated.
//
// Returns:
//         output[i][2] = Gi as a standard variate as in Ord && Getis 1995
//         output[i][3] = Gi as a non-standard variate as in Getis && Ord 1992
//         output[i][4] = GiStar as a non-standard variate as in Getis && Ord 1992
//         output[i][1] = GiStar as a standard variate according to Getis && Ord 1995
//         output[i][5] = Wi - Number of neighbours for XYZ point ! including point itself

const GetisOrdGi = (xyz, inputmaxDist, MissingData) => {
    let n, SDGi,  numeratorGi,  denominatorGi,  Egid92, VarGid92,  Wi,  S1i
    let WiGiStar,  S1GiStar,  WiSquaredGiStar, numeratorGiStar
    let denominatorGiStar, meanGiStar,  SDGiStar,  sumwijdxjGstar
    let sumwijdxjGi,  meanGi,  Wisquared,  distance, i,  j

    // it is an input in the original script
    numrows = xyz.length

    // Initialize a zero filled output array
    // With a classical for beacuse ES6 fill function injects a wrong persistent
    // behavior when calling output[i][1] = value (???)
    let output =  new Array(numrows)
    for (n = 0; n < numrows; n++) {
        output[n] = [0,0,0,0,0]
    }

    // Sum of Z values and its squared sum (it is inputs in the original script )
    let sumxjatz = xyz.reduce((acc,elm) => acc + elm[2], 0)
    let sumxjsquaredatz = xyz.reduce((acc,elm) => acc + elm[2]**2, 0)

    n = numrows
    // Kernel to determisumxjsquaredatz = ne distances && base important variables on these
    for(i = 0; i < numrows; i++){
        //Initialize variables for current XYZ point
        sumwijdxjGi = 0.0
        sumwijdxjGstar = 0.0
        Wi = 0.0
        S1i = 0.0
        meanGi = 0.0
        meanGiStar = 0.0
        SDGi = 0.0
        SDGiStar = 0.0
        Egid92 = 0.0
        WiGiStar = 0.0
        S1GiStar = 0.0
        WiSquaredGiStar = 0.0
        numeratorGiStar = 0.0
        denominatorGiStar = 0.0
        Wisquared = 0.0
        numeratorGi = 0.0
        denominatorGi = 0.0
        Egid92 = 0.0
        VarGid92 = 0.0
        meanGi = (sumxjatz - xyz[i][2]) / (n - 1)
        SDGi = (((sumxjsquaredatz - (xyz[i][2] ** 2)) / (n - 1)) - meanGi ** 2) ** 0.5
        meanGiStar = sumxjatz / n
        SDGiStar = ((sumxjsquaredatz / n) - meanGiStar ** 2) ** 0.5
        // If an XYZ point is less than || equal to the user specified lag
        // distance then include it in the calculation of the LSA for the
        // current point
        for(j = 0; j < numrows; j++){
            distance = Math.sqrt((xyz[i][0] - xyz[j][0]) ** 2 + (xyz[i][1] - xyz[j][1])** 2)
            if(distance <= inputmaxDist ){
                //so that considered point is used in GiStar
                sumwijdxjGstar = sumwijdxjGstar + xyz[j][2]
                if(distance <= inputmaxDist && distance != 0 ){
                    //so that considered point is ! used in Gi
                    sumwijdxjGi = sumwijdxjGi + xyz[j][2]
                    Wi++
                    S1i = Wi //Because binary weights are used S1i = Wi
                }
            }
        }
        S1i = Wi
        Wisquared = Wi ** 2
        // create variables for Gi* calculations
        WiGiStar = Wi + 1 //add a one for Wii since original point is considered adjacent to self
        S1GiStar = WiGiStar //Because binary weights are used
        WiSquaredGiStar = WiGiStar ** 2
        numeratorGiStar = (sumwijdxjGstar - (WiGiStar * meanGiStar))
        denominatorGiStar = SDGiStar * Math.sqrt(((S1GiStar * n) - WiSquaredGiStar) / (n - 1))
        // create variables for Gi calculations
        numeratorGi = (sumwijdxjGi - (Wi * meanGi))
        denominatorGi = SDGi * Math.sqrt((((n - 1) * S1i) - Wisquared) / (n - 2))
        // These are the traditional formulate for the expected value of the Gi && GiStar Statistic
        // Can be used if required by user more information on each LSA statistic
        Egid92 = Wi / (n - 1)
        VarGid92 = ((Wi * (n - 1 - Wi)) / (((n - 1) ** 2) * (n - 2))) * ((SDGi / meanGi) ** 2)
        // EGistar92 = WiGiStar / n
        // VarGistar92 = ((WiGiStar * (n - WiGiStar)) * SDGiStar ** 2) / ((n * n) * (n - 1) * (meanGiStar ** 2))
        // Output each statistic to the output array
        if(denominatorGi == 0 || VarGid92 == 0 ){
            // that is if there are no neighbours for a point
            output[i][1] = MissingData // zarray(i) = 0
            output[i][2] = sumwijdxjGi / (meanGi * (n - 1)) // gid92(i) = sumwijdxjGi / (meanGi * (n - 1)) // used to be gid92(i) = 0 but is actually equal to 1 if all points are included
            output[i][3] = sumwijdxjGstar / (meanGiStar * (n)) // ZGid92(i) = 0
            output[i][0] = MissingData // GidStar(i) = 0
            output[i][4] = Wi // Number of neighbours for XYZ point ! including point itself
        }
        else{
            output[i][1] = numeratorGi / denominatorGi // Gi as a standard variate as in Ord && Getis 1995
            output[i][2] = sumwijdxjGi / (meanGi * (n - 1)) // Gi as a non-standard variate as in Getis && Ord 1992
            // output i][3, = ((sumwijdxjGi / (meanGi * (n - 1))) - Egid92) / Math.sqrt(VarGid92) - alternate form of Gi as a standard variate
            // The observed statistic minus the expected value divided by the standard deviation
            output[i][3] = sumwijdxjGstar / (meanGiStar * (n)) // GiStar as a non-standard variate as in Getis && Ord 1992
            // output[i][4] = ((sumwijdxjGstar / (meanGiStar * (n))) - eGistar92) / (Math.sqrt(varGistar92)) - Alternative form of GiStar as a standard variate
            output[i][0] = numeratorGiStar / denominatorGiStar // GiStar as a standard variate according to Getis && Ord 1995
            output[i][4] = Wi // Number of neighbours for XYZ point ! including point itself
        }
    }
    return output
}

module.exports = {
    GetisOrdGi
}
