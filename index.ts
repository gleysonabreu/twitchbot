import TwitchBot from './bot/TwitchBot';

const twtBot = new TwitchBot('MalvadoFavorito', 'bxllyl8k309e6xmzfn8n2ehvqko3d4', ['gleysonabreu']);
twtBot.addCommand({ command: '!hello', say: 'hello world.' });
twtBot.addCommand({ command: '#vce?', say: 'tu que é!' });
twtBot.connect();