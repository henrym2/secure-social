<template>
  <div class="card d-flex flex-column profile m-3">
    <div class="profile-title flex-row d-flex m-3">
      <h3>Profile</h3>
    </div>
    <div class="profile-content flex-column f-flex m-3">
      <p>User Name: {{userName}}</p>
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
        :fields="fields"
      >
      </b-table>
      <div class="d-flex flex-row">
        <b-pagination
          v-model="currentPage"
          :total-rows="trustRows"
          :per-page="perPage"
          aria-controls="trust-table">
        </b-pagination>
        <b-button varient="danger" class="ml-auto mr-1 add-button" @click="remove">Remove</b-button>
          <b-button variant="primary" class="ml-2 add-button" v-b-modal.add-trust-modal>Add</b-button>
      </div>
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
</template>

<script>
const BOX_ID = process.env.VUE_APP_BOX_ID

export default {
  name: "Profile",
  data () {
    return {
      userName: this.$store.state.user.email,
      perPage: 5,
      currentPage: 1,
      trustName: '',
      valid: null,
      trusted: [],
      selected: [],
      fields: [
        'id', 'email'
      ]
    }
  },
  computed: {
    trustRows () {
      return this.trusted.length
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  mounted() {
    this.trusted = this.$store.state.user.trusted
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
      this.$jsonbox.read(BOX_ID, "users", {query: `email:${this.trustName}`}).then(res => {
        this.trusted.push({ id: res[0]._id, email: this.trustName, publicKey: res[0].publicKey })
        this.$jsonbox.update({ ...this.$store.state.user, trusted: this.trusted}, BOX_ID, this.$store.state.user._id)
        this.$nextTick(() => {
        this.$bvModal.hide('add-trust-modal')
      })
      }).catch(e => {
        console.log(e)
      })
      
    },
    async remove() {
      await this.$jsonbox.update({ ...this.$store.state.user, trusted: this.trusted}, BOX_ID, this.$store.state.user._id)
      this.$jsonbox.read(BOX_ID, "posts",{query: `author:${this.userName}`}).then(res => {
        let promises = [];
        console.log(res)
        if (res != undefined && res.length > 0) {
        res.forEach(async post => {
          promises.push(
            this.$jsonbox.update(
              {...post, trusted: post.trusted.filter(x => !this.selected.includes(x))}, BOX_ID, this.$store.state.user._id)
          )
          await Promise.all(promises)
        })
        }
      }).catch((e) => console.log(e))
      if (this.selected.length != 0) {
        this.trusted = this.trusted.filter(x => !this.selected.includes(x))
      }
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