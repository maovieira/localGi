# localGi
Calculates Getis-Ord Gi and Gi* statistic for each row in array dataset. 

This is a port and adaptation funcion from the original VB script of the local Getis Ord statistic function created by M. Sawada from the Laboratory for Paleoclimatology and Climatology, Department of Geography, University of Ottawa
Ottawa, Ontario, Canada K1N 6N5
October 1999
http://www.lpc.uottawa.ca/data/scripts/

Ported, adapted and tested agaist Spencer Chainey paper and also ArcGIS Pro 2.1.2 results by Marco Vieira, maovieira@gmail.com
May 2018
https://www.linkedin.com/in/maovieira

Function GetisOrdGi(xyz(), inputmaxDist, MissingData)

Purpose: To calculate local Getis-Ord statistic for an 2-D array (xyz()) xyz[i][1] = X, xyz[i][2] = Y, xyz[i][3] = Z).

Input:  xyz() is a 2d array with XYZ data see Purpose
        inputmaxdist: the current lag distance chosen by user
        MissingDataCode: the numeric code to signify that the current point has no variance && so Ci cannot be calculated.

Returns:
        output[i][2] = Gi as a standard variate as in Ord && Getis 1995
        output[i][3] = Gi as a non-standard variate as in Getis && Ord 1992
        output[i][4] = GiStar as a non-standard variate as in Getis && Ord 1992
        output[i][1] = GiStar as a standard variate according to Getis && Ord 1995
        output[i][5] = Wi - Number of neighbours for XYZ point ! including point itself
