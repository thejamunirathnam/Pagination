<template>
  <div class="hello">
    <h3>{{ arr.length }} Courses found</h3>
    <div class="card-container" v-for="p in parr" :key="p.title">
      <div class="card-header">
        <div class="card-heading">
          <div>
            <div class="card-title">MBA {{ p.id }}</div>
            <div class="card-subtitle">
              Postgraduate
              <span>. Full Time </span>
              <span>. 1 year </span>
            </div>
          </div>
          <div class="card-icons">
            <div class="ic-1 action-btn">
              <svg
                width="23"
                height="16"
                viewBox="0 0 23 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5"
              >
                <path
                  d="M8.01143 10.2857H0V12.5714H8.01143V16L12.5714 11.4286L8.01143 6.85714V10.2857ZM14.8457 9.14286V5.71429H22.8571V3.42857H14.8457V0L10.2857 4.57143L14.8457 9.14286Z"
                ></path>
              </svg>
            </div>
            <div class="ic-2 action-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.7301 1.00514C14.942 1.07361 13.3841 1.82573 12.0892 3.21804L12.01 3.30461L11.9413 3.22671C10.6035 1.75867 8.94158 1 6.99944 1C3.39752 1 0 4.36199 0 7.87064C0 10.6058 1.13563 12.3311 4.08545 15.2316L12.0003 23L19.9994 15.1467L20.5484 14.5938C23.0881 11.9947 24 10.4138 24 7.87064C24 4.384 20.5523 1 17 1L16.7301 1.00514ZM17 2.96304C19.4477 2.96304 22 5.46816 22 7.87064C22 9.70086 21.3251 10.9307 19.2894 13.0447L18.8144 13.5296L18.2501 14.0893L12 20.2231L5.23787 13.5843L4.74841 13.088C2.72794 11.001 2 9.70528 2 7.87064C2 5.44259 4.50575 2.96304 6.99944 2.96304C8.69068 2.96304 10.0494 3.76313 11.1588 5.45687L11.9848 6.71789L12.8321 5.47053C13.9891 3.76705 15.3543 2.96304 17 2.96304Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="price">
          ₹18,95,600
          <span>First year</span>
        </div>
        <div class="card-subtitle">Coventry University, United Kingdom</div>
      </div>
    </div>

    <Pagination
      :total-pages="totalpageno"
      :total="arr.length"
      :per-page="perpage"
      :current-page="currentPage"
      @pagechanged="onPageChange"
      :arr="arr"
      ref="child"
    />
  </div>
</template>



<script>
import Pagination from "./Pagination.vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      arr: [],
      totalpageno: 0,
      perpage: 10,
      currentPage: 1,
      parr: [],
    };
  },
  components: {
    Pagination,
  },
  watch: {
    "$store.state.page": function () {
      this.onPageChange();
    },
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        this.arr = res.data;
        this.totalpageno = this.arr.length / this.perpage;
        this.onPageChange(1);
      })
      .catch((err) => {
        console.log(err);
      });

    // var options = {
    //   method: "POST",
    //   url: "https://api-qa.edvoy.com/graphql",
    //   headers: { "Content-Type": "application/json" },
    //   data: `{"query":"query courseSearch(\n$sorting: [SortingInputDto!]\n$paging: PagingInputDto = {limit: 25, offset: 0}\n$filter: CourseFilterDto!\n$query: String = ""\n) {\n  courseSearch(sorting: $sorting, paging: $paging, filter: $filter, query: $query) {\n    count\n    items {\n      _id\n      name\n      institution\n      institutionSlug\n      courseLevel\n      subjects\n    }\n  }\n}","variables":{"filter":{}, paging: {limit:${this.perpage}, offset: ${this.currentPage}]},"operationName":"courseSearch"}`,
    // };
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //      this.arr = response.data;
    //     this.totalpageno = this.arr.length / this.perpage;
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  },

  methods: {
    onPageChange() {
      const indexOfLastTodo = this.$store.state.page * this.perpage;
      const indexOfFirstTodo = indexOfLastTodo - this.perpage;
      const currentTodos = this.arr.slice(indexOfFirstTodo, indexOfLastTodo);
      this.currentPage = this.$store.state.page;
      this.parr = currentTodos;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-heading {
  display: flex;
  justify-content: space-between;
}
.card-header {
  padding: 1rem;
}
.card-title {
  color: rgba(31, 45, 62);
  font-weight: 700;
  font-family: "Roboto";
  text-align: left;
}
.card-subtitle {
  font-size: 0.75rem;
  color: rgba(31, 45, 62);
  font-family: "Roboto";
  text-align: left;
}
.card-container {
  border-top-width: 4px;
  border-style: solid;
  border-radius: 0.25rem;
  border-width: 1px;
  margin-bottom: 15px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgba(224, 230, 237, var(--tw-border-opacity));
}
.price {
  margin-top: 1rem;
  font-weight: 700;
  color: rgba(31, 45, 62);
  font-family: "Roboto";
  text-align: left;
}
.price span {
  font-size: 0.75rem;
  font-weight: 400;
}
.card-icons {
  display: flex;
}
.action-btn {
  margin-left: 0.75rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: rgba(224, 230, 237, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(31, 45, 62, var(--tw-text-opacity));
  width: 34px;
  height: 34px;
}
.action-btn svg {
  width: 1.25rem;
}
.hello {
  width: 50%;
}
h3 {
  text-align: left;
}
</style>
