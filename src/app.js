require('dotenv').config();

const userRoutes = require('./routes/userRouter');
const emailRoutes = require('./routes/emailRouter');
const dashboardRoutes = require('./routes/dashboardRouter');
const noticeRoutes = require('./routes/noticeRouter');
const authRoutes = require('./routes/authRouter');

app.use('/api/users', userRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/auth', authRoutes);