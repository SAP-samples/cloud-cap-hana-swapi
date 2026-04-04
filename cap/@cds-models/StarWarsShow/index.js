// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsShow = { name: 'StarWarsShow' }
module.exports = StarWarsShow
module.exports.StarWarsShow = StarWarsShow
// Show
module.exports.Show = createEntityProxy(['StarWarsShow', 'Show'], { target: { is_singular: true }, customProps: ["show_type"] })
module.exports.Show_ = createEntityProxy(['StarWarsShow', 'Show'], { target: { is_singular: false }})
// Episode
module.exports.Episode = createEntityProxy(['StarWarsShow', 'Episode'], { target: { is_singular: true } })
module.exports.Episode_ = createEntityProxy(['StarWarsShow', 'Episode'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsShow', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsShow', 'People'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsShow', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsShow', 'Planet'], { target: { is_singular: false }})
// Species
module.exports.Species = createEntityProxy(['StarWarsShow', 'Species'], { target: { is_singular: true } })
module.exports.Species_ = createEntityProxy(['StarWarsShow', 'Species'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsShow', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsShow', 'Starship'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsShow', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsShow', 'Vehicles'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsShow', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsShow', 'Vehicle'], { target: { is_singular: false }})
// Show2People
module.exports.Show2People = createEntityProxy(['StarWarsShow', 'Show2People'], { target: { is_singular: true } })
module.exports.Show2People_ = createEntityProxy(['StarWarsShow', 'Show2People'], { target: { is_singular: false }})
// Show2Planets
module.exports.Show2Planet = createEntityProxy(['StarWarsShow', 'Show2Planets'], { target: { is_singular: true } })
module.exports.Show2Planets = createEntityProxy(['StarWarsShow', 'Show2Planets'], { target: { is_singular: false }})
// Show2Starships
module.exports.Show2Starship = createEntityProxy(['StarWarsShow', 'Show2Starships'], { target: { is_singular: true } })
module.exports.Show2Starships = createEntityProxy(['StarWarsShow', 'Show2Starships'], { target: { is_singular: false }})
// Show2Species
module.exports.Show2Species = createEntityProxy(['StarWarsShow', 'Show2Species'], { target: { is_singular: true } })
module.exports.Show2Species_ = createEntityProxy(['StarWarsShow', 'Show2Species'], { target: { is_singular: false }})
// Show2Vehicles
module.exports.Show2Vehicle = createEntityProxy(['StarWarsShow', 'Show2Vehicles'], { target: { is_singular: true } })
module.exports.Show2Vehicles = createEntityProxy(['StarWarsShow', 'Show2Vehicles'], { target: { is_singular: false }})
// Media
module.exports.Media = createEntityProxy(['StarWarsShow', 'Media'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Media_ = createEntityProxy(['StarWarsShow', 'Media'], { target: { is_singular: false }})
// MediaCharacters
module.exports.MediaCharacter = createEntityProxy(['StarWarsShow', 'MediaCharacters'], { target: { is_singular: true } })
module.exports.MediaCharacters = createEntityProxy(['StarWarsShow', 'MediaCharacters'], { target: { is_singular: false }})
// MediaPlanets
module.exports.MediaPlanet = createEntityProxy(['StarWarsShow', 'MediaPlanets'], { target: { is_singular: true } })
module.exports.MediaPlanets = createEntityProxy(['StarWarsShow', 'MediaPlanets'], { target: { is_singular: false }})
// MediaSpecies
module.exports.MediaSpecies = createEntityProxy(['StarWarsShow', 'MediaSpecies'], { target: { is_singular: true } })
module.exports.MediaSpecies_ = createEntityProxy(['StarWarsShow', 'MediaSpecies'], { target: { is_singular: false }})
// MediaStarships
module.exports.MediaStarship = createEntityProxy(['StarWarsShow', 'MediaStarships'], { target: { is_singular: true } })
module.exports.MediaStarships = createEntityProxy(['StarWarsShow', 'MediaStarships'], { target: { is_singular: false }})
// MediaVehicles
module.exports.MediaVehicle = createEntityProxy(['StarWarsShow', 'MediaVehicles'], { target: { is_singular: true } })
module.exports.MediaVehicles = createEntityProxy(['StarWarsShow', 'MediaVehicles'], { target: { is_singular: false }})
// MediaTypeValues
module.exports.MediaTypeValue = createEntityProxy(['StarWarsShow', 'MediaTypeValues'], { target: { is_singular: true } })
module.exports.MediaTypeValues = createEntityProxy(['StarWarsShow', 'MediaTypeValues'], { target: { is_singular: false }})
// ShowTypeValues
module.exports.ShowTypeValue = createEntityProxy(['StarWarsShow', 'ShowTypeValues'], { target: { is_singular: true }, customProps: ["show_type"] })
module.exports.ShowTypeValues = createEntityProxy(['StarWarsShow', 'ShowTypeValues'], { target: { is_singular: false }})
// NetworkValues
module.exports.NetworkValue = createEntityProxy(['StarWarsShow', 'NetworkValues'], { target: { is_singular: true } })
module.exports.NetworkValues = createEntityProxy(['StarWarsShow', 'NetworkValues'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Show.show_type ??= { LIVE_ACTION_SERIES: "LIVE_ACTION_SERIES", ANIMATED_SERIES: "ANIMATED_SERIES", ANIMATED_FILM: "ANIMATED_FILM", ANTHOLOGY: "ANTHOLOGY" }
module.exports.Media.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
module.exports.ShowTypeValue.show_type ??= { LIVE_ACTION_SERIES: "LIVE_ACTION_SERIES", ANIMATED_SERIES: "ANIMATED_SERIES", ANIMATED_FILM: "ANIMATED_FILM", ANTHOLOGY: "ANTHOLOGY" }
