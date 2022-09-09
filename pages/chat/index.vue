<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <ul ref="messages" class="messages">
            <li v-for="(msg, index) in messages" :key="index" class="message">
              <i :title="msg.date">
                {{ msg.date.split("T")[1].slice(0, -2) }} </i
              >: {{ msg.text }}
            </li>
          </ul>
        </div>
        <input
          v-model="message"
          class="inputMessage"
          type="text"
          placeholder="Type here..."
          @keyup.enter="sendMessage"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  middleware: ["auth"],
  data() {
    return {
      messages: [],
      message: "",
      socket: null,
      query: {
        room_id: "",
        user_id: "",
      },
    };
  },
  beforeMount() {
    this.room = this.$store.state.room;

    this.query.room_id = this.room.room_id;
    this.query.user_id = this.room.user_id;

    this.socket = io(process.env.WS_URL, {
      query: {
        room_id: this.query.room_id,
        user_id: this.query.user_id,
      },
    });

    this.socket.on("new-message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return;
      }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim(),
      };
      this.messages.push(message);
      this.message = "";
      this.socket.emit("send-message", message);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}

html,
input {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  word-wrap: break-word;
}

/* Pages */

.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

.page {
  height: 100%;
  position: absolute;
  width: 100%;
}

/* Font */

.messages {
  font-size: 150%;
}

.inputMessage {
  font-size: 100%;
}

.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}

/* Messages */

.chatArea {
  height: 100%;
  padding-bottom: 60px;
}

.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}

/* Input */

.inputMessage {
  border: 10px solid #4c4f4f;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}
</style>
