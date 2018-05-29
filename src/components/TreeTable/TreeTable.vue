<template>
    <div>
        <h1>TreeTable Component</h1>
        <v-data-table 
          :items="tableItems" 
          :headers="header"
          hide-actions
          class="elevation-1"
          :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td v-for="(value, idx) of header" v-bind:key="idx" v-bind:class="{ hidden: props.item.hidden }">
                    
                    <span v-if="idx === 0">
                      <span v-bind:style="{'padding-left': (props.item.depth * 20) + 'px'}">
                        <span v-if="props.item.hasChildren">
                            <v-icon class="clickable" v-if="!props.item.expanded" @click="expandChildren(props.item)">chevron_right</v-icon>
                            <v-icon class="clickable" v-if="props.item.expanded" @click="collapseChildren(props.item)">expand_more</v-icon>
                            {{props.item[value.value]}}
                        </span>
                        <span v-else style="padding-left: 28px">
                          {{props.item[value.value]}}
                        </span>
                        
                      </span>
                    </span>
                  <span v-else>
                    {{props.item[value.value]}}
                  </span>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import * as Helper from './Helper';

export default {
  props: ['data', 'header'],
  mounted() {
    console.log(this.header);
    this.tableItems = Helper.processData(this.data, null);
  },
  data() {
    return {
      tableItems: [],
      collapseChildren(parent) {
        for (var item of this.tableItems) {
          if (item.parent === parent.id) {
            item.hidden = true;
          }
        }

        parent.expanded = false;
      },
      expandChildren(parent) {
        for (var item of this.tableItems) {
          if (item.parent === parent.id) {
            item.hidden = false;
          }
        }

        parent.expanded = true;
      }
    };
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}

.clickable {
  cursor: pointer;
}
</style>
