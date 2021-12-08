const wxml = (options) =>
    `<view class="container" >
            <image class="img" src="../../lib/imgs/MCTECH-LOGO.png"></image>
            <text class="time">${options.time}</text>
            <text class="date">${options.date}</text>
    </view>`

const style = {
    container: {
        width: 200,
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
    },
    time: {
        width: 200,
        height: 30,
        fontSize: 30,
        textAlign: 'left',
        color: '#E1E6FD',
        marginTop: '-6'
    },
    date: {
        width: 200,
        height: 20,
        fontSize: 20,
        color: '#E1E6FD',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceBetween'

    },
    img: {
        width: 200,
        height: 120
    }
}

module.exports = {
    wxml,
    style
}