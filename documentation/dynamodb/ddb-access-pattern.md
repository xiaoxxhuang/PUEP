Access Patterns matrix

| Entity | Access pattern | Read or write | Type | Result ordering |
|---|---|---|---|---|
| Pokemons    | get pokemon details by pokemon name         | Read  | Single Item   | N/A |
| Emblems     | get all emblems                             | Read  | Multiple Item | Group By color |
|             | get emblems by effect                       | Read  | Multiple Item | Desc for positive effect, Asc for negative effect |
|             | get emblems by emblem color                 | Read  | Multiple Item | N/A |
|             | get emblems by emblem type                  | Read  | Multiple Item | N/A |
|             | get emblem details by emblem name           | Read  | Single Item   | N/A |
|             | update emblems details by emblem's name     | Write | Single Item   | N/A |
|             | insert emblems details                      | Write | Single Item   | N/A |
| EmblemColor | get emblem color details by emblem color    | Read  | Single Item   | N/A |
|             | update emblem color details by emblem color | Write | Single Item   | N/A |