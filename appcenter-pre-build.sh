# android  
if [ "$OS" == "android" ]; then
   # body
  if ["$ENV" == "beta" ] ;then
    echo run beta
  fi

elif [ "$OS" == "ios" ]; then
   echo run ios
fi
