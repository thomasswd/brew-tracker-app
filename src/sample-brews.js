const brews = [
    {
        brewer: 'V60',
        roastType: 'light roast',
        coffeeWaterRatio: '1:15',
        coffeeAmount: 15, //in grams
        waterAmount: 230,
        pourNumber: 4,
        pours: [
            45,
            55,
            55,
            55
        ],
        brewTime: 210, //seconds 
        id: 123123
    },
    {
        brewer: 'kalita wave',
        roastType: 'medium roast',
        coffeeWaterRatio: '1:17',
        coffeeAmount: 20, //in grams
        waterAmount: 340,
        pourNumber: 5,
        pours: [
            45,
            49,
            49,
            49,
            48
        ],
        brewTime: 240,
        id: 234234
    },
    {
        brewer: 'aeropress',
        roastType: 'light roast',
        coffeeWaterRatio: '1:16',
        coffeeAmount: 18, //in grams
        waterAmount: 290,
        pourNumber: 2,
        pours: [
            45,
            135
        ],
        brewTime: 180,
        id: 345345
    },
]

export default brews