// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsPeople = { name: 'StarWarsPeople' }
module.exports = StarWarsPeople
module.exports.StarWarsPeople = StarWarsPeople
// Film
module.exports.Film = createEntityProxy(['StarWarsPeople', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsPeople', 'Film'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsPeople', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsPeople', 'People'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsPeople', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsPeople', 'Planet'], { target: { is_singular: false }})
// Species
module.exports.Species = createEntityProxy(['StarWarsPeople', 'Species'], { target: { is_singular: true } })
module.exports.Species_ = createEntityProxy(['StarWarsPeople', 'Species'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsPeople', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsPeople', 'Starship'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsPeople', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsPeople', 'Vehicles'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsPeople', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsPeople', 'Vehicle'], { target: { is_singular: false }})
// genders
module.exports.gender = createEntityProxy(['StarWarsPeople', 'genders'], { target: { is_singular: true } })
module.exports.genders = createEntityProxy(['StarWarsPeople', 'genders'], { target: { is_singular: false }})
// hairColors
module.exports.hairColor = createEntityProxy(['StarWarsPeople', 'hairColors'], { target: { is_singular: true } })
module.exports.hairColors = createEntityProxy(['StarWarsPeople', 'hairColors'], { target: { is_singular: false }})
// eyeColors
module.exports.eyeColor = createEntityProxy(['StarWarsPeople', 'eyeColors'], { target: { is_singular: true } })
module.exports.eyeColors = createEntityProxy(['StarWarsPeople', 'eyeColors'], { target: { is_singular: false }})
// skinColors
module.exports.skinColor = createEntityProxy(['StarWarsPeople', 'skinColors'], { target: { is_singular: true } })
module.exports.skinColors = createEntityProxy(['StarWarsPeople', 'skinColors'], { target: { is_singular: false }})
// peopleCount
module.exports.peopleCount = createEntityProxy(['StarWarsPeople', 'peopleCount'], { target: { is_singular: true } })
module.exports.peopleCount_ = createEntityProxy(['StarWarsPeople', 'peopleCount'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsPeople', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsPeople', 'Film2People'], { target: { is_singular: false }})
// Episode2People
module.exports.Episode2People = createEntityProxy(['StarWarsPeople', 'Episode2People'], { target: { is_singular: true } })
module.exports.Episode2People_ = createEntityProxy(['StarWarsPeople', 'Episode2People'], { target: { is_singular: false }})
// Episode
module.exports.Episode = createEntityProxy(['StarWarsPeople', 'Episode'], { target: { is_singular: true } })
module.exports.Episode_ = createEntityProxy(['StarWarsPeople', 'Episode'], { target: { is_singular: false }})
// Show
module.exports.Show = createEntityProxy(['StarWarsPeople', 'Show'], { target: { is_singular: true } })
module.exports.Show_ = createEntityProxy(['StarWarsPeople', 'Show'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsPeople', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsPeople', 'Species2People'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsPeople', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsPeople', 'Starship2Pilot'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsPeople', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsPeople', 'Vehicle2Pilot'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsPeople', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsPeople', 'Film2Planets'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsPeople', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsPeople', 'Film2Starships'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsPeople', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsPeople', 'Film2Vehicles'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsPeople', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsPeople', 'Film2Species'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsPeople', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsPeople', 'Planet2People'], { target: { is_singular: false }})
// events
// actions
module.exports.countByGender = 'countByGender'
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
