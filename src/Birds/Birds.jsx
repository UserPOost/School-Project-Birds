const birds = [
    {
        group: 'Songbirds (Passerines)',
        birds: [
            {
                name: 'Australian Magpie',
                sciName: 'Gymnorhina tibicen',
                description:
                    'The Australian magpie is a highly intelligent bird with striking black-and-white plumage and a melodious song. Found across urban and rural landscapes, it’s known for its vocal abilities and playful nature. However, during nesting season, it can become protective, swooping at perceived threats to defend its territory.',
                facts: [
                    'Lifespan: 20–30 years',
                    'Size: Around 40 cm long',
                    'Habitat: Grasslands, woodlands, parks, and gardens',
                    'Diet: Omnivorous – insects, small animals, and seeds',
                    'Behavior: Social, intelligent, and territorial',
                ],
            },
            {
                name: 'Pied Butcherbird',
                sciName: 'Cracticus nigrogularis',
                description:
                    'Beautiful, flute-like song and aggressive feeder. Black-and-white plumage.',
                facts: [
                    'Lifespan: Up to 22.2 years',
                    'Size: 30–35 cm long',
                    'Habitat: Open forests, woodlands, urban areas',
                    'Diet: Carnivorous – insects, small vertebrates, and occasionally fruit',
                    'Behavior: Impales prey for storage',
                ],
            },
            {
                name: 'Grey Butcherbird',
                sciName: 'Cracticus torquatus',
                description:
                    'Grey and white plumage with a black cap. Melodious call.',
                facts: [
                    'Lifespan: ~12 years',
                    'Size: 28–30 cm long',
                    'Habitat: Forests, woodlands, and urban areas',
                    'Diet: Carnivorous – insects, small reptiles, and birds',
                    'Behavior: Impales prey and territorial calls',
                ],
            },
            {
                name: 'Australian Raven',
                sciName: 'Corvus coronoides',
                description:
                    'Large black bird with wailing call. Highly intelligent.',
                facts: [
                    'Lifespan: Up to 20 years',
                    'Size: 46–53 cm long',
                    'Habitat: Forests, woodlands, and urban areas',
                    'Diet: Omnivorous – insects, carrion, fruits, grains',
                    'Behavior: Problem-solving, intelligent',
                ],
            },
            {
                name: 'Superb Fairy-wren',
                sciName: 'Malurus cyaneus',
                description:
                    'Small bird, males with bright blue plumage. Complex social behavior.',
                facts: [
                    'Lifespan: ~5 years',
                    'Size: 14 cm long',
                    'Habitat: Dense undergrowth in forests and gardens',
                    'Diet: Insectivorous – insects and arthropods',
                    'Behavior: Cooperative breeding, very social',
                ],
            },
        ],
    },
    {
        group: 'Kingfishers and Allies',
        birds: [
            {
                name: 'Laughing Kookaburra',
                sciName: 'Dacelo novaeguineae',
                description:
                    'Largest kingfisher, iconic laughing call, common in woodlands.',
                facts: [
                    'Lifespan: 11–15 years (up to 20 in captivity)',
                    'Size: 39–42 cm',
                    'Habitat: Open forests, woodlands, suburbs',
                    'Diet: Insects, small reptiles, amphibians, mammals',
                    'Behavior: Territorial, family groups',
                ],
            },
            {
                name: 'Blue-winged Kookaburra',
                sciName: 'Dacelo leachii',
                description:
                    'Bright blue wings and tail, found in northern Australia.',
                facts: [
                    'Lifespan: ~10–15 years',
                    'Size: 38–42 cm',
                    'Habitat: Savannas, mangroves, woodlands',
                    'Diet: Insects, reptiles, amphibians',
                    'Behavior: More solitary, quieter than Laughing Kookaburra',
                ],
            },
            {
                name: 'Sacred Kingfisher',
                sciName: 'Todiramphus sanctus',
                description:
                    'Turquoise and white plumage, found near water and forest edges.',
                facts: [
                    'Lifespan: ~6–10 years',
                    'Size: 19–23 cm',
                    'Habitat: Mangroves, riverbanks, woodlands',
                    'Diet: Insects, small reptiles, crustaceans',
                    'Behavior: Solitary, territorial',
                ],
            },
            {
                name: 'Red-backed Kingfisher',
                sciName: 'Todiramphus pyrrhopygius',
                description:
                    'Small kingfisher with red back, lives in arid regions.',
                facts: [
                    'Lifespan: ~5–8 years',
                    'Size: 19–23 cm',
                    'Habitat: Arid woodlands and deserts',
                    'Diet: Insects and small vertebrates',
                    'Behavior: Perches on wires, solitary',
                ],
            },
            {
                name: 'Forest Kingfisher',
                sciName: 'Todiramphus macleayii',
                description:
                    'Small bird with blue and white plumage, seen in pairs.',
                facts: [
                    'Lifespan: ~6–10 years',
                    'Size: 20–23 cm',
                    'Habitat: Forests, mangroves, woodlands',
                    'Diet: Insects, small vertebrates',
                    'Behavior: Pairs during breeding, territorial',
                ],
            },
        ],
    },
    {
        group: 'Wading Birds',
        birds: [
            {
                name: 'Australian White Ibis',
                sciName: 'Threskiornis molucca',
                description:
                    'White plumage, long curved bill. Common in cities and wetlands.',
                facts: [
                    'Lifespan: Up to 28 years',
                    'Size: 65–75 cm',
                    'Habitat: Wetlands, parks, urban areas',
                    'Diet: Invertebrates, human scraps, aquatic animals',
                    'Behavior: Flocks, adaptable',
                ],
            },
            {
                name: 'Straw-necked Ibis',
                sciName: 'Threskiornis spinicollis',
                description:
                    'Iridescent feathers and straw-like neck feathers.',
                facts: [
                    'Lifespan: 15–20 years',
                    'Size: 70–75 cm',
                    'Habitat: Grasslands, wetlands, farms',
                    'Diet: Insects, frogs, reptiles',
                    'Behavior: Gregarious, flocks',
                ],
            },
            {
                name: 'Royal Spoonbill',
                sciName: 'Platalea regia',
                description:
                    'Large white bird with spoon-shaped bill.',
                facts: [
                    'Lifespan: ~15 years',
                    'Size: 74–81 cm',
                    'Habitat: Wetlands and estuaries',
                    'Diet: Aquatic insects, fish, crustaceans',
                    'Behavior: Swishes bill side to side to feed',
                ],
            },
            {
                name: 'Little Egret',
                sciName: 'Egretta garzetta',
                description:
                    'Small white heron, elegant in appearance with long slender legs.',
                facts: [
                    'Lifespan: 5–10 years',
                    'Size: 55–65 cm',
                    'Habitat: Wetlands, riverbanks',
                    'Diet: Fish, amphibians, small invertebrates',
                    'Behavior: Solitary, hunting in shallow waters',
                ],
            },
            {
                name: 'Great Egret',
                sciName: 'Ardea alba',
                description:
                    'Large, all-white heron with long neck and yellow bill.',
                facts: [
                    'Lifespan: 15–20 years',
                    'Size: 90–104 cm',
                    'Habitat: Wetlands, estuaries, coastal lagoons',
                    'Diet: Fish, amphibians, reptiles',
                    'Behavior: Elegant hunting, tall and graceful',
                ],
            },
        ],
    },
    {
        group: 'Australian Seabirds',
        birds: [
            {
                name: 'Fairy Tern',
                sciName: 'Sterna nereis',
                description:
                    'Small, graceful tern with a delicate look and fluttering flight.',
                facts: [
                    'Lifespan: 10–15 years',
                    'Size: 28–30 cm',
                    'Habitat: Coastal beaches, islands',
                    'Diet: Fish and small marine invertebrates',
                    'Behavior: Nesting in colonies, agile hunters',
                ],
            },
            {
                name: 'Black-browed Albatross',
                sciName: 'Thalassarche melanophris',
                description:
                    'Large seabird with a wide wingspan, known for its incredible long-distance flights.',
                facts: [
                    'Lifespan: 30–40 years',
                    'Size: 81–127 cm wingspan',
                    'Habitat: Open ocean, subantarctic waters',
                    'Diet: Squid, fish',
                    'Behavior: Long-distance migration, soaring',
                ],
            },
            {
                name: 'Silver Gull',
                sciName: 'Chroicocephalus novaehollandiae',
                description:
                    'Common Australian gull, often seen in coastal cities.',
                facts: [
                    'Lifespan: 10–15 years',
                    'Size: 36–44 cm',
                    'Habitat: Coastal and inland areas',
                    'Diet: Fish, scraps, small invertebrates',
                    'Behavior: Bold, scavenger',
                ],
            },
            {
                name: 'Gull-billed Tern',
                sciName: 'Gelochelidon nilotica',
                description:
                    'Medium-sized tern with a distinctive short bill.',
                facts: [
                    'Lifespan: ~10 years',
                    'Size: 30–35 cm',
                    'Habitat: Coastal wetlands, estuaries',
                    'Diet: Small fish, crustaceans',
                    'Behavior: Hunting in shallow waters',
                ],
            },
            {
                name: 'Caspian Tern',
                sciName: 'Hydroprogne caspia',
                description:
                    'Large tern with a heavy bill and distinctive black cap.',
                facts: [
                    'Lifespan: 20–30 years',
                    'Size: 45–55 cm',
                    'Habitat: Coastal, estuarine habitats',
                    'Diet: Fish and crustaceans',
                    'Behavior: Solitary, aggressive hunters',
                ],
            },
        ],
    },
];
