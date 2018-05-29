<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <TreeTable :data="items" :header="header"></TreeTable>
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
    children: [
      {
        id: 2,
        title: 'child1',
        children: [
          {
            id: 3,
            title: 'child3'
          }
        ]
      },
      {
        id: 4,
        title: 'child4',
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
      header: [
        {
          text: 'The item title',
          value: 'title',
          sortable: false
        },
        {
          text: 'An id',
          value: 'id',
          sortable: false
        },
        {
          text: 'Depth of the item',
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
