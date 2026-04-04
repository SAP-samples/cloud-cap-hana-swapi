// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const StarWarsFilm = { name: 'StarWarsFilm' }
module.exports = StarWarsFilm
module.exports.StarWarsFilm = StarWarsFilm
// Film
module.exports.Film = createEntityProxy(['StarWarsFilm', 'Film'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.Film_ = createEntityProxy(['StarWarsFilm', 'Film'], { target: { is_singular: false }})
// People
module.exports.People = createEntityProxy(['StarWarsFilm', 'People'], { target: { is_singular: true } })
module.exports.People_ = createEntityProxy(['StarWarsFilm', 'People'], { target: { is_singular: false }})
// Planet
module.exports.Planet = createEntityProxy(['StarWarsFilm', 'Planet'], { target: { is_singular: true } })
module.exports.Planet_ = createEntityProxy(['StarWarsFilm', 'Planet'], { target: { is_singular: false }})
// Species
module.exports.Species = createEntityProxy(['StarWarsFilm', 'Species'], { target: { is_singular: true } })
module.exports.Species_ = createEntityProxy(['StarWarsFilm', 'Species'], { target: { is_singular: false }})
// Starship
module.exports.Starship = createEntityProxy(['StarWarsFilm', 'Starship'], { target: { is_singular: true } })
module.exports.Starship_ = createEntityProxy(['StarWarsFilm', 'Starship'], { target: { is_singular: false }})
// Vehicles
module.exports.Vehicle = createEntityProxy(['StarWarsFilm', 'Vehicles'], { target: { is_singular: true } })
module.exports.Vehicles = createEntityProxy(['StarWarsFilm', 'Vehicles'], { target: { is_singular: false }})
// Vehicle
module.exports.Vehicle = createEntityProxy(['StarWarsFilm', 'Vehicle'], { target: { is_singular: true } })
module.exports.Vehicle_ = createEntityProxy(['StarWarsFilm', 'Vehicle'], { target: { is_singular: false }})
// Film2People
module.exports.Film2People = createEntityProxy(['StarWarsFilm', 'Film2People'], { target: { is_singular: true } })
module.exports.Film2People_ = createEntityProxy(['StarWarsFilm', 'Film2People'], { target: { is_singular: false }})
// Film2Planets
module.exports.Film2Planet = createEntityProxy(['StarWarsFilm', 'Film2Planets'], { target: { is_singular: true } })
module.exports.Film2Planets = createEntityProxy(['StarWarsFilm', 'Film2Planets'], { target: { is_singular: false }})
// Film2Starships
module.exports.Film2Starship = createEntityProxy(['StarWarsFilm', 'Film2Starships'], { target: { is_singular: true } })
module.exports.Film2Starships = createEntityProxy(['StarWarsFilm', 'Film2Starships'], { target: { is_singular: false }})
// Film2Species
module.exports.Film2Species = createEntityProxy(['StarWarsFilm', 'Film2Species'], { target: { is_singular: true } })
module.exports.Film2Species_ = createEntityProxy(['StarWarsFilm', 'Film2Species'], { target: { is_singular: false }})
// Film2Vehicles
module.exports.Film2Vehicle = createEntityProxy(['StarWarsFilm', 'Film2Vehicles'], { target: { is_singular: true } })
module.exports.Film2Vehicles = createEntityProxy(['StarWarsFilm', 'Film2Vehicles'], { target: { is_singular: false }})
// directors
module.exports.director = createEntityProxy(['StarWarsFilm', 'directors'], { target: { is_singular: true } })
module.exports.directors = createEntityProxy(['StarWarsFilm', 'directors'], { target: { is_singular: false }})
// producers
module.exports.producer = createEntityProxy(['StarWarsFilm', 'producers'], { target: { is_singular: true } })
module.exports.producers = createEntityProxy(['StarWarsFilm', 'producers'], { target: { is_singular: false }})
// FilmEpisodeDesc
module.exports.FilmEpisodeDesc = createEntityProxy(['StarWarsFilm', 'FilmEpisodeDesc'], { target: { is_singular: true }, customProps: ["episode_id"] })
module.exports.FilmEpisodeDesc_ = createEntityProxy(['StarWarsFilm', 'FilmEpisodeDesc'], { target: { is_singular: false }})
// Species2People
module.exports.Species2People = createEntityProxy(['StarWarsFilm', 'Species2People'], { target: { is_singular: true } })
module.exports.Species2People_ = createEntityProxy(['StarWarsFilm', 'Species2People'], { target: { is_singular: false }})
// Vehicle2Pilot
module.exports.Vehicle2Pilot = createEntityProxy(['StarWarsFilm', 'Vehicle2Pilot'], { target: { is_singular: true } })
module.exports.Vehicle2Pilot_ = createEntityProxy(['StarWarsFilm', 'Vehicle2Pilot'], { target: { is_singular: false }})
// Starship2Pilot
module.exports.Starship2Pilot = createEntityProxy(['StarWarsFilm', 'Starship2Pilot'], { target: { is_singular: true } })
module.exports.Starship2Pilot_ = createEntityProxy(['StarWarsFilm', 'Starship2Pilot'], { target: { is_singular: false }})
// Planet2People
module.exports.Planet2People = createEntityProxy(['StarWarsFilm', 'Planet2People'], { target: { is_singular: true } })
module.exports.Planet2People_ = createEntityProxy(['StarWarsFilm', 'Planet2People'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.Film.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
module.exports.FilmEpisodeDesc.episode_id ??= { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, OTHER: 0 }
