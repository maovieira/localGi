# localGi

Calculates Getis-Ord Gi and Gi* statistic (local spatial autocorrelation) for a 2D array dataset to evaluate where neighboring locations with either high or low values clusters spatially.


## Usage
It is a Javascript ES6 function. To be use it in any compatible browser, Node-jS and so on.

function GetisOrdGi(xyz(), inputmaxDist, MissingData)

### Input:
* xyz is the 2D array where x,y is a projected pair of coordinates (not a geographic one, such as longitude and latitude) and z is the value you want to evaluate. 
* inputmaxDist is a fixed distance band value (Threshold distance) that determines which represented neighboring locations will be considered in the spatial relationship conceptualization (all neighbours outside the distance treshould will be excluded from calculation). Should be in the same unit as the cartographic projection. Is recomended a value which ensures every location/feature had at LEAST one neighbor especially if the input data is skewed (does not create a nice bell curve when you plot the values as a histogram).
Usually make sure that the number of neighbors is neither too small (most features have only one or two neighbors) nor too large (several features include all other features as neighbors), because that would make resultant Z scores less reliable. The Z scores are reliable (even with skewed data) as long as each feature is associated with several neighbors (approximately 8, as a rule of thumb). 
This function can be applied to skewed data because it is "asymptotically normal".

### Output:
The interpretation of the Getis-Ord statistics is very straightforward: a positive value suggests a high-high cluster or hot spot, a negative value indicates a low-low cluster or cold spot.

*  output[i][2] = Gi as a standard variate as in Ord && Getis 1995
* output[i][3] = Gi as a non-standard variate as in Getis && Ord 1992
* output[i][4] = GiStar as a non-standard variate as in Getis && Ord 1992
* output[i][1] = GiStar as a standard variate according to Getis && Ord 1995
* output[i][5] = Wi - Number of neighbours for XYZ point including point itself

## Author

This is a port and adaptation funcion from the original VB script of the local Getis Ord statistic function created by **M. Sawada** from the Laboratory for Paleoclimatology and Climatology, Department of Geography, University of Ottawa
Ottawa, Ontario, Canada K1N 6N5
October 1999
http://www.lpc.uottawa.ca/data/scripts/

Ported, adapted and tested agaist **Spencer Chainey** paper and also **ArcGIS** Pro 2.1.2 results
by **Marco Vieira** [localGi](https://github.com/maovieira/localGi), maovieira@gmail.com
May 2018
https://www.linkedin.com/in/maovieira

## References and More information

* Getis, Arthur, and J. Keith Ord. 1992. “The Analysis of Spatial Association by Use of Distance Statistics.” Geographical Analysis 24:189–206.
* Ord, J. Keith, and Arthur Getis. 1995. “Local Spatial Autocorrelation Statistics: Distributional Issues and an Application.” Geographical Analysis 27:286–306.
* Anselin, Luc. 1995. “Local Indicators of Spatial Association — LISA.” Geographical Analysis 27:93–115. 
* ESRI ArcGis help and resources available online for the **Hotspot analysis** tool.
* Chainey, Spencer. 2010. Spatial significance hotspot mapping using the Gi* statistic. Jill Dando Institute of Security and Crime Science, University College London.
* Sawada,M. 1999. ROOKCASE: An Excel 97/2000 Visual Basic(VB) Add-In For Exploring Global And Local Spatial Autocorrelation. Bulletin of the Ecological Society of America:231-234.

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md]() file for details
