<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <h1>Tree Table view</h1>
          <TreeTable :data="items" :headers="headers"></TreeTable>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import TreeTable from '@/components/TreeTable/TreeTable';

let vals = [
  {
    id: 1,
    title: 'root',
    summary: 'Root element',
    children: [
      {
        id: 2,
        title: 'child1',
        summary: 'element',
        children: [
          {
            id: 3,
            title: 'child3',
            summary: 'element'
          },
          {
            id: 5,
            title: 'child5',
            summary: 'element',
            children: [
              {
                id: 6,
                title: 'child6',
                summary: 'element'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'child4',
        summary: 'element',
        children: []
      }
    ]
  }
];

export default {
  components: {
    TreeTable
  },

  data() {
    return {
      items: vals,
      headers: [
        {
          text: 'The item title',
          value: 'title',
          sortable: false,
          readonly: false
        },
        {
          text: 'An id',
          value: 'id',
          sortable: false,
          readonly: true
        },
        {
          text: 'Summary',
          value: 'summary',
          sortable: false,
          readonly: false
        },
        {
          text: 'Depth',
          value: 'depth',
          sortable: false
        }
      ]
    };
  }
};
</script>

<style>
</style>
