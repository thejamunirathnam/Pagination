
<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li class="pagination-item"></li>
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
        >
          «
        </button>
      </li>

      <li v-for="page in pages" :key="page.name" class="pagination-item">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
          :aria-label="`Go to page number ${page.name}`"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
        >
          »
        </button>
      </li>

      <li class="pagination-item"></li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    arr: {
      type: Array,
    },
  },
  data() {
    return {
      arrcontent: [],
    };
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },

  methods: {
    ...mapActions(["onClickPreviousPage", "onClickPage", "onClickNextPage"]),

    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pagination {
  list-style-type: none;
  padding: 0;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
}

.pagination-item {
  display: inline-block;
}

button {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  font-size: 16px;
  background: #ffffff;
  line-height: 1.25;
  border: 1px solid #d4dce6;
}

.active {
  background-color: #ff1f39;
  border-color: #ff1f39;
  z-index: 1;
  color: #ffffff;
}
</style>

