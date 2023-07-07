using {star.wars} from '../schema';
extend star.wars.People with {
    extend name with @sql.append : 'FUZZY SEARCH INDEX ON'
}

define view star.wars.tallestPerson as
    select from star.wars.People distinct {
        first_value(name order by
            to_integer(height) desc
        ) as tallest_name: String
};
