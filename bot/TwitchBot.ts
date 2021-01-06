import tmi, { Options, Client, ChatUserstate } from 'tmi.js';

interface ICommand {
  command: string;
  say: string;
}

class TwitchBot {
  private userName: string;
  private oAuth: string;
  private channelBoot: string[];

  private client: Client;
  private commands: ICommand[];


  constructor(userName: string, oAuth: string, channelBoot: string[]) {
    this.userName = userName;
    this.oAuth = oAuth;
    this.channelBoot = channelBoot;
    this.commands = [];
    this.client = tmi.client(this.options()); 
  };

  options() {
    return {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
        secure: true,
      },
      identity: {
        username: this.userName,
        password: this.oAuth
      },
      channels: [...this.channelBoot],
    } as Options;
  };

  connect() {
    this.client.connect().catch(console.error);
    this.client.on('connected', (address, port) => {
      this.client.action(this.userName, 'Hello, bot connected');
    });

    this.client.on('chat', (channel, user, message, self) => {
      this.command(channel, user, message);
    });
  };

  addCommand(command: ICommand) {
    this.commands.push(command);
  };

  command(channel: string, user:ChatUserstate, message: string,) {
    this.commands.forEach((command) => {
      if(message.toLowerCase() === command.command){
        this.client.say(channel, `@${user.username}, ${command.say}`);
      }
    });
  }
}

export default TwitchBot;