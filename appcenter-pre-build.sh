# android  
if [ "$OS" == "android" ]; then
   # body
  if ["$ENV" == "beta" ] ;then
    npm run build:js
  fi

elif [ "$OS" == "ios" ]; then
   echo run ios
fi
