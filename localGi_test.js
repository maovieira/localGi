const gi = require('./localGi.js')

let xyz = [
    [-4806902.89330833, -2626223.92099809, 95],
    [-4814415.3530533, -2630675.1357293, 4],
    [-4806534.42409717, -2627724.86508411, 113],
    [-4808093.03064014, -2629172.66180312, 36],
    [-4809880.14835002, -2632074.14164119, 82],
    [-4813350.42991985, -2629693.39819411, 37],
    [-4826528.28950829, -2631567.24117727, 159],
    [-4815273.6507311, -2626565.31273229, 108]
]
let inputmaxDist = 12146
let MissingData = null

console.log(gi.GetisOrdGi(xyz, inputmaxDist, MissingData))