<template>
    <v-edit-dialog
    :return-value.sync="data"
    lazy
    >
        <slot></slot>
        <v-text-field
        slot="input"
        :label="label"
        single-line
        counter
        v-model="data"
        @keyup.enter="accepted"
        >
        </v-text-field>  
    </v-edit-dialog>
</template>

<script>
export default {
  props: {
    label: String
  },
  mounted() {
    this.data = '';
  },
  data() {
    return {
      data: '',
      accepted() {
        this.$emit('onEnter', this.data);
      }
    };
  }
};
</script>

<style>
</style>
