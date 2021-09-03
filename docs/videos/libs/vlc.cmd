set "arg=%1"
set "argp=%arg:*:=%"
cd "C:\Program Files\VideoLAN\VLC\"
start vlc --http-reconnect %argp%