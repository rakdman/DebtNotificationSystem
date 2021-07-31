const nodemailer = require('nodemailer')

function sendemail(esubject,ebody,etoemail)
{
    const DataSubject = esubject
    const DataBody =ebody
    const DataTo =etoemail
    const DataFrom = 'DebtCollectionSystem'

    // console.log('Inside sendemail API');
    // console.log('Subject:'+ DataSubject+ ' Body:'+ DataBody + ' To:' +DataTo);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'dhim.rakesh@gmail.com',
        pass: 'Thinkpositive@22'
        }
    });

   
    var mailOptions = {
        from: DataFrom,
        to: DataTo,
        subject: DataSubject,
        text: DataBody
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        // console.log('Email sent: ' + info.response);
        }
    });
}

// sendemail("Test email from function","Dear Customer...","dhim.rakesh@gmail.com")

exports.sendemail=sendemail

