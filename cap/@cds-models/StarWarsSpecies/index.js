// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsSpecies = { name: 'StarWarsSpecies' }
module.exports = StarWarsSpecies
module.exports.StarWarsSpecies = StarWarsSpecies
// Species
module.exports.Species = createEntityProxy(['StarWarsSpecies', 'Species'], { target: { is_singular: true } })
module.exports.Species_ = createEntityProxy(['StarWarsSpecies', 'Species'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsSpecies', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsSpecies', 'Planet'], { target: { is_singular: false }})
// Film
module.exports.Film = createEntityProxy(['StarWarsSpecies', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsSpecies', 'Film'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsSpecies', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsSpecies', 'People'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsSpecies', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsSpecies', 'Vehicle'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsSpecies', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsSpecies', 'Vehicles'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsSpecies', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsSpecies', 'Starship'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsSpecies', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsSpecies', 'Film2Species'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsSpecies', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsSpecies', 'Species2People'], { target: { is_singular: false }})
// hairColorValues
module.exports.hairColorValue = createEntityProxy(['StarWarsSpecies', 'hairColorValues'], { target: { is_singular: true } })
module.exports.hairColorValues = createEntityProxy(['StarWarsSpecies', 'hairColorValues'], { target: { is_singular: false }})
// eyeColorValues
module.exports.eyeColorValue = createEntityProxy(['StarWarsSpecies', 'eyeColorValues'], { target: { is_singular: true } })
module.exports.eyeColorValues = createEntityProxy(['StarWarsSpecies', 'eyeColorValues'], { target: { is_singular: false }})
// skinColorValues
module.exports.skinColorValue = createEntityProxy(['StarWarsSpecies', 'skinColorValues'], { target: { is_singular: true } })
module.exports.skinColorValues = createEntityProxy(['StarWarsSpecies', 'skinColorValues'], { target: { is_singular: false }})
// classificationValues
module.exports.classificationValue = createEntityProxy(['StarWarsSpecies', 'classificationValues'], { target: { is_singular: true } })
module.exports.classificationValues = createEntityProxy(['StarWarsSpecies', 'classificationValues'], { target: { is_singular: false }})
// designationValues
module.exports.designationValue = createEntityProxy(['StarWarsSpecies', 'designationValues'], { target: { is_singular: true } })
module.exports.designationValues = createEntityProxy(['StarWarsSpecies', 'designationValues'], { target: { is_singular: false }})
// languageValues
module.exports.languageValue = createEntityProxy(['StarWarsSpecies', 'languageValues'], { target: { is_singular: true } })
module.exports.languageValues = createEntityProxy(['StarWarsSpecies', 'languageValues'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsSpecies', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsSpecies', 'Film2Planets'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsSpecies', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsSpecies', 'Planet2People'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsSpecies', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsSpecies', 'Film2People'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsSpecies', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsSpecies', 'Film2Starships'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsSpecies', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsSpecies', 'Film2Vehicles'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsSpecies', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsSpecies', 'Vehicle2Pilot'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsSpecies', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsSpecies', 'Starship2Pilot'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
