<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Login</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="room_id">Room</label>
              <input
                type="text"
                class="form-control"
                id="room_id"
                v-model="data.room_id"
                placeholder="Enter room"
              />
            </div>
            <div class="form-group">
              <label for="user_id">Name</label>
              <input
                type="text"
                class="form-control"
                id="user_id"
                v-model="data.user_id"
                placeholder="Enter name"
              />
            </div>
            <button type="submit" class="btn btn-primary" @click="login">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        room_id: "",
        user_id: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("saveRoom", this.data);
      this.$router.push("/chat");
    },
  },
};
</script>
