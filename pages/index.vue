<template>
  <div id="container">
    <div id="mainContainer">
      <h2>Giriş Sayfası</h2>
      <hr />

      <div id="kullaniciAdContainer">
        <label for="">Ad:</label>
        <input type="text" v-model="loginData.ad" />
      </div>

      <div id="kullaniciEmailContainer">
        <label for="">Email:</label>
        <input type="text" v-model="loginData.email" />
      </div>

      <div id="kullaniciSifreContainer">
        <label for="">Şifre:</label>
        <input type="password" v-model="loginData.password" />
      </div>

      <div id="girisYap">
        <form @submit.prevent="login">
          <button>Giriş Yap</button>
        </form>
      </div>

      <div id="text">
        <p>Hesabın yok mu ? <nuxt-link id="signup" to="/signup"><strong>Kaydol</strong></nuxt-link></p>
      </div>

      <div>
        Veya
      </div>

      <div>
        <p>Giriş Yapmadan <nuxt-link id="signup" to="/anasayfa"><strong>Devam</strong></nuxt-link> Et
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: '',
        password: '',
        ad: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://localhost:5000/api/login', this.loginData);
        alert('Giriş başarılı!');
        localStorage.setItem('token', response.data.token);
        this.$router.push('/anasayfa');
      } catch (error) {
        alert(error.response.data.message || 'Bir hata oluştu.');
        console.error(error);
      }
    },
  },
};
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
#mainContainer {
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

#kullaniciAdContainer {
  margin-left: 20px;
  margin-bottom: 10px;
}

#kullaniciEmailContainer {
  margin-bottom: 10px;
  margin-left: 0px;
}

#kullaniciSifreContainer {
  margin-left: 6px;
}

#girisYap {
  width: 74%;
  float: right;
}

#girisYap button {
  width: 100%;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 0px 5px 0px;
  background-color: azure;
}

#girisYap button:hover {
  background-color: greenyellow;
  transition: 0.3s;
}

#oauth2 {
  margin-top: 10px;
}

.gmailLogin {
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  background-color: aliceblue;
}

.gmailLogin:hover {
  background-color: orangered;
  transition: 0.3s;
}

.facebookLogin {
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  background-color: aliceblue;
}

.facebookLogin:hover {
  background-color: rgb(70, 70, 255);
  transition: 0.3s;
}

#signup {
  color: gray;
  text-decoration: none;
}

#signup:hover {
  color: blue;
  transition: 0.3s;
}
</style>
