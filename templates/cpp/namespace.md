# {{name}} {{anchor refid}}

{{briefdescription}}

{{detaileddescription}}

{{#if filtered.members}}

{{#each filtered.members}}

## {{name}} {{anchor refid}}

```cpp
{{proto}} 
```

{{#if enumvalue}}
 Value                          | Description                                 
--------------------------------|---------------------------------------------
{{#each enumvalue}}`{{cell name}}`            | {{cell summary}}
{{/each}}
{{/if}}

{{briefdescription}}

{{detaileddescription}}

{{/each}}
{{/if}}