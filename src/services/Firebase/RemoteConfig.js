import remoteConfig from '@react-native-firebase/remote-config';

// remote config default data
let REMOTE_CONFIG_DATA = {
  crash_me_button: {
    isEnabled: false,
  },
};

function init() {
  remoteConfig().setDefaults({
    ...REMOTE_CONFIG_DATA,
  });
}

async function fetchData() {
  await init();
  await remoteConfig().fetch(1800);
  await remoteConfig().activate();
  const remoteConfigRawData = await remoteConfig().getAll();

  const data = {};
  Object.keys(remoteConfigRawData).forEach((key) => {
    data[key] = JSON.parse(remoteConfigRawData[key]._value);
  });

  REMOTE_CONFIG_DATA = data;

  return true;
}

function getData(configKey) {
  try {
    return REMOTE_CONFIG_DATA[configKey];
  } catch (error) {
    console.log('error happens when getting remote config data');
  }
}

export default {
  fetchData,
  getData,
};
