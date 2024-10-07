# <h1 style="color:#6600ff;font-size:4rem;">Addis-music</h1>
<h3>This project was created as the final portfolio project for the Alx Software Engineering Program.</h3>

<p>The project draws its inspiration from the popular "Addis Music Telegram Channel" one of the most significant music distribution channels in Ethiopia,</p>


## <h2 style="color:#ff1a1a">Development Note:</h2>
=> Don't forget to include big size file's in .gitignore
=> add advanced auth mechanism(otp) email verification
=> 


## <h2 style="color:#6600ff">Dependencies</h2>
redis-server/focal-updates,focal-security,now 5:5.0.7-2ubuntu0.1 amd64
    <code>sudo apt install redis-server</code>
ffmpeg version 4.2.7-0ubuntu0.1 Copyright (c) 2000-2022 the FFmpeg developers
    <code>sudo apt install ffmpeg</code>

## <h2 style="color:#6600ff">Environment variables</h2>
    PORT: default 5000,
    DB_URL: default 'mongodb://localhost:27017/addis_music'
    JWT_SECRET: default 'dfhjktyuiofghjk5689okjhgffghjkkfds'
    DATA_PATH: default '/var/www/addis_music'
    HLS_PATH: default '/var/tmp/addis_music/hls'

#### <h4 style="color:#6600ff">NOTE:</h4>
<p style="font-size:1.1rem">For windows os <b style="color:#ff6666">DATA_PATH</b> and <b style="color:#ff6666">HLS_PATH</b> default value might not work properly, so change it value in config.js</p>


## <h2 style="color:#6600ff">Deployment for development env't</h2>
<code>git clone https://github.com/beab1212/addis-music.git</code>
### backend
    cd backend
    npm install
    npm start

### frontend
    cd frontend
    npm install
    npm start
