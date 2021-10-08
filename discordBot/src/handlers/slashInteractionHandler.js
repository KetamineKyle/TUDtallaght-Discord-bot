const bot = require('../');
let config = bot.getConfig();

exports.slashInteractionHandler = async(interaction) =>{
    if(config.useSlashCommands !== true) {
        interaction.reply({content:'Slash commands are turned off.', ephemeral: true});
        return;
    }

    let roles = [],
        command = interaction?.commandName.toLowerCase();

    if(config?.commands[command] === undefined) return;
    else command = config.commands[command];

    let guild = bot.client.guilds.cache.get(config.serverid);
    let member = await guild.members.fetch(interaction.user.id);
    
    // get all the users roles and add them the the 'roles' array
    member.roles.cache.map(m => roles = [...roles, m.name.toLowerCase()]);
    
    if (config.devid.includes(interaction.user.id) === false && bot.hasPermissions(roles, [...command.roles.user, ...config.roles.admin]) !== true) interaction.reply({ 
        content: `<@${interaction.user.id}> You dont have the sufficient privileges to execute this command.`,
        ephemeral: true 
    });
    else { 
        let splitMessage = [interaction.commandName];
        interaction.options._hoistedOptions.forEach(subCommand => splitMessage = [...splitMessage, subCommand.value])
        command.commandCallback(splitMessage, interaction, {roles, isSlashCommand: true});
    }
}