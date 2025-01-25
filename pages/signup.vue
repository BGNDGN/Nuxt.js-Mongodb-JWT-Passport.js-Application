<template>
  <div id="firstly">
    <div id="main">
      <h2>Kayıt Sayfası</h2>
      <hr>
      <form @submit.prevent="signup">
        
        <div id="kayitAdContainer">
          <label for="">Ad:</label>
          <input v-model="signUp.ad" type="text" required>
        </div>

        <div id="kayitEmailContainer">
          <label for="">Email:</label>
          <input v-model="signUp.email" type="email" required>
        </div>

        <div id="kayitSifreContainer">
          <label for="">Şifre:</label>
          <input v-model="signUp.password" type="password" required>
        </div>

        <div id="kaydol">
          <button>Kaydol</button>
        </div>

        <div id="text">
          <p>Hesap <nuxt-link id="backToLoginPage" to="/"><strong>Giriş</strong></nuxt-link> sayfasına dön </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUp: { email: '', password: '', ad: '' },
    };
  },

  methods: {
    async signup() {
      try {
        if (!this.signUp.ad || !this.signUp.email || !this.signUp.password) {
          alert("Lütfen tüm alanları doldurun.");
          return;
        }

        const response = await this.$axios.post('http://localhost:5000/api/db', this.signUp);
        alert(response.data.message);
        this.signUp = { ad:'', email: '', password: '' };
        this.$router.push('/');
      } catch (error) {
        this.signUp = { ad: '', email: '', password: '' };
        alert(error.response.data.message || "Bir hata oluştu.");
        console.error("Bir hata oluştu.");
      }
    },
  }
}
</script>

<style scoped>
body {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 15px;
  background-color: black;
}

#firstly {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

#main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20%;
  border: 2px solid black;
  border-radius: 20px;
  background-color: beige;
  padding-top: 20px;
  width: 20%;
}

h2 {
  margin-top: -5px;
}

hr {
  width: 90%;
  border: 1px solid black;
  margin-bottom: 20px;
  margin-top: -5px;
}

#kayitAdContainer {
  margin-left: 8px;
  margin-bottom: 10px;
}

#kayitEmailContainer {
  margin-bottom: 10px;
  margin-left: -10px;
}

#kayitSifreContainer {
  margin-bottom: 10px;
  margin-left: -4px;
}

#kaydol {
  width: 100%;
  float: right;
  margin-bottom: 10px;
}

#kaydol button {
  width: 100%;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 0px;
  background-color: azure;
}

#kaydol button:hover {
  background-color: greenyellow;
  transition: 0.3s;
}

#oauth {
  margin-top: 10px;
}

#text {
margin-left: 23px;
}

#backToLoginPage {
  color: gray;
  text-decoration: none;
}

#backToLoginPage:hover {
  color: blue;
  transition: 0.3s;
  text-decoration: underline;
}
</style>
