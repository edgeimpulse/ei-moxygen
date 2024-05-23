# {{name}} {{anchor refid}}

{{#if briefdescription}}
**Brief**: {{briefdescription}}
{{/if}}

{{#if detaileddescription}}
**Description**:  
{{detaileddescription}}
{{/if}}

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

{{#if briefdescription}}
**Brief**: {{briefdescription}}
{{/if}}

{{#if detaileddescription}}
**Description**:  
{{detaileddescription}}
{{/if}}

{{/each}}
{{/if}}