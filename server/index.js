import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const uri = "mongodb+srv://burakgundogan:ekmek3456@burakgundogan.jubqn.mongodb.net/KullanıcıBilgileri?retryWrites=true&w=majority&appName=burakgundogan";

async function initializeDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Veri tabanına başarıyla bağlanıldı.");
  } catch (err) {
    console.error("Veri tabanına bağlanırken bir hata oluştu:", err);
    process.exit(1);
  }
}

initializeDatabase();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'default_secret_key', 
};

const userSchema = new mongoose.Schema({
  ad: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
}, { collection: 'kayitlilar' });

const User = mongoose.model('kayitli', userSchema);

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

app.use(passport.initialize());

app.post('/api/login', async (req, res) => {
  try {
    const { ad, email, password } = req.body;

    if (!email || !password || !ad) {
      return res.status(400).json({ message: 'Ad, Email ve şifre gerekli!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Şifre hatalı!' });
    }

    const token = jwt.sign({ id: user._id, ad: user.ad, email: user.email, }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Giriş başarılı!', token });
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

app.post('/api/db', async (req, res) => {
  try {
    const { email, password, ad } = req.body;

    if (!email || !password || !ad) {
      return res.status(400).json({ success: false, message: "Ad, Email ve Şifre alanlarını doldurmak zorunludur." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Bu e-posta adresi zaten kayıtlı." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ad, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ success: true, message: "Kaydınız Yapıldı." });
  } catch (error) {
    console.error("Hata:", error);
    res.status(400).json({ success: false, message: "Bir hata oluştu." });
  }
});

app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Korunan rotaya erişildi!', user: req.user });
});
