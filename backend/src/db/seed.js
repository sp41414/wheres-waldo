const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
    await prisma.game.create({
        data: {
            imageBoardSource: '/images/wheres-waldo.jpg',
            characters: {
                create: [
                    {
                        name: 'Waldo',
                        imageSource: null,
                        XPosition: null,
                        YPosition: null,
                    },
                    {
                        name: 'Odlaw',
                        // TODO: Update
                        imageSource: null,
                        XPosition: null,
                        YPosition: null,
                    },
                    {
                        name: 'Wizard',
                        imageSource: null,
                        XPosition: null,
                        YPosition: null,
                    },
                ],
            },
        },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
