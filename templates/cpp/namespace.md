# `{{name}}` {{anchor refid}}

{{briefdescription}}

{{detaileddescription}}

{{#if filtered.members}}

{{#each filtered.members}}
## {{name}} {{anchor refid}}

{{proto}} 

{{#if enumvalue}}
 Values                         | Descriptions                                
--------------------------------|---------------------------------------------
{{#each enumvalue}}{{cell name}}            | {{cell summary}}
{{/each}}
{{/if}}

{{briefdescription}}

{{detaileddescription}}

{{/each}}
{{/if}}