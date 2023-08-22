const { exec } = require('child_process');

const sendMessage = ({dest, subject, content}) => {
    const command = `echo "${content}" | sendmail -f sender@example.com -t ${dest} -s "${subject}" -a "Content-Type: text/html"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log('Email sent successfully!');
    });
};

module.exports = sendMessage;