require('dotenv').config()
const prisma = require('./prisma')

async function main() {
    await prisma.game.create({
        data: {
            imageBoardSource: 'https://i.redd.it/3azczwthxnne1.jpeg',
            characters: {
                create: [
                    {
                        name: 'Waldo',
                        XPosition: 60,
                        YPosition: 35,
                    },
                    {
                        name: 'Odlaw',
                        XPosition: 10,
                        YPosition: 33,
                    },
                    {
                        name: 'Wizard',
                        XPosition: 26,
                        YPosition: 33,
                    },
                ],
            },
        },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
