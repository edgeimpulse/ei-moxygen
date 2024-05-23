
## {{name}} {{anchor refid}}

```cpp
{{proto}} 
```

{{#if basecompoundref}}
```
{{kind}} {{name}}
  {{#each basecompoundref}}
  : {{prot}} {{name}}
  {{/each}}
```
{{/if}}

{{#if briefdescription}}
**Brief**: {{briefdescription}}
{{/if}}

{{#if detaileddescription}}
**Description**:  
{{detaileddescription}}
{{/if}}

 Member                         | Description                                 
--------------------------------|---------------------------------------------
{{#each filtered.compounds}}{{cell proto}}        | {{cell summary}}
{{/each}}{{#each filtered.members}}`{{cell proto}}` | {{cell summary}}
{{/each}}
