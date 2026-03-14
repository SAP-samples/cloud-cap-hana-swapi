using from '../schema';
using {StarWarsPeople} from '../../srv/people-service';

define view star.wars.peopleFirstNamePg as
	select from star.wars.People {
		key ID,
			name,
			split_part(name, ' ', 1) as first_name : String
	};

extend service StarWarsPeople with {
	@readonly
	entity peopleFirstNamePg as projection on star.wars.peopleFirstNamePg;
};
