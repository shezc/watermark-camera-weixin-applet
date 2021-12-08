const wxml = (options) =>
    `<view class="container" >
            <view class="img_container">
                <image class="img" src="../../lib/imgs/mc.png"></image>
            </view>
            <text class="time">${options.time}</text>
            <text class="date">${options.date}</text>
            <text class="address">${options.address}</text>
    </view>`

const style = {
    img_container: {
        width: 200,
        height: 35,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    container: {
        width: 200,
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
    },
    time: {
        width: 200,
        height: 40,
        fontSize: 40,
        textAlign: 'left',
        color: '#E1E6FD',
        marginTop: '-5'
    },
    date: {
        width: 200,
        height: 30,
        fontSize: 30,
        color: '#E1E6FD',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceBetween',
        marginTop: 15
    },
    img: {
        width: 128,
        height: 35
    },
    address: {
        width: 200,
        height: 85,
        color: 'white',
        fontSize: 24
    }
}

module.exports = {
    wxml,
    style
}