using { StarWarsPeople } from './people-service';

annotate StarWarsPeople.People with @changelog: [name, timestamp] {
    name @changelog;
    height @changelog;
}

