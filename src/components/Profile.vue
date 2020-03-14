<template>
  <div class="card d-flex flex-column profile m-3">
    <div class="profile-title flex-row d-flex m-3">
      <h3>Profile</h3>
    </div>
    <div class="profile-content flex-column f-flex m-3">
      <p>User Name: Admin</p>
      <p>Password: ***********</p>
      <p>Public Key: ***********</p>
    </div>
    <div class="trusted-users m-4">
      <b-table 
        show-empty
        striped 
        hover 
        :items="trusted"
        selectable
        select-mode="multi"
        @row-selected="onSelect"
        responsive="sm"
        id="trust-table"
        :per-page="perPage"
        :current-page="currentPage"
        bordered
      >
      </b-table>
      <div class="d-flex flex-row">
        <b-pagination
          v-model="currentPage"
          :total-rows="trustRows"
          :per-page="perPage"
          aria-controls="trust-table">
        </b-pagination>
        <b-button variant="primary" class="ml-auto add-button" v-b-modal.add-trust-modal>Add</b-button>
        <b-modal 
          id="add-trust-modal"
          title="Add trusted user"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk">
          <form ref="addTrustForm" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="valid"
              label="Email"
              label-for="email-input"
              invalid-feedback="Email is required">
                <b-form-input
                  id="email-input"
                  v-model="trustName"
                  :state="valid"
                  required
                  placeholder="John@smith.com">
                </b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      trustName: '',
      valid: null,
      trusted: [
        {id: 0, email: "John"},
      ],
      selected: []
    }
  },
  computed: {
    trustRows () {
      return this.trusted.length
    }
  },
  methods: {
    onSelect (items) {
      this.selected = items
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if(!this.checkValid()) {
        return 
      }

      this.trusted.push({id: 0, email: this.trustName})
      this.$nextTick(() => {
        this.$bvModal.hide('add-trust-modal')
      })
    },
    resetModal() {
      this.trustName = ''
      this.valid = null
    },
    checkValid() {
      const v = this.$refs.addTrustForm.checkValidity()
      this.valid = v
      return v
    }
  }
}
</script>

<style scoped>
.profile {
  width: 55rem;
}

.add-button {
  height: 2.5rem;
}
</style>