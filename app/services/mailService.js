const { exec } = require('child_process');

const sendMessage = ({ dest, subject, content }) => {
    const command = `echo "${content}" | mail -s "${subject}" -a "Content-type: text/html" ${dest}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log('Email sent successfully!');
    });
};

module.exports = sendMessage;