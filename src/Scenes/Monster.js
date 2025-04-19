// Jenalee Nguyen
class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Arms
        this.leftArmX = this.bodyX - 100;
        this.leftArmY = this.bodyY - 50;

        this.rightArmX = this.bodyX + 100;
        this.rightArmY = this.bodyY - 50;
        
        // Legs
        this.leftLegX = this.bodyX - 60;
        this.leftLegY = this.bodyY + 140;

        this.rightLegX = this.bodyX + 60;
        this.rightLegY = this.bodyY + 140;

        // Eyes
        this.EyeX = this.bodyX;
        this.EyeY = this.bodyY - 25;

        // Smiles
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 30;

        // Horns
        this.leftHornX = this.bodyX - 50;
        this.leftHornY = this.bodyY - 100;

        this.rightHornX = this.bodyX + 50;
        this.rightHornY = this.bodyY - 100;

        // Polling initialization
        this.keyA = null;
        this.keyD = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteE.png");
        // Arms
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_whiteC.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.leftArm.flipY = true;
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_whiteC.png");
        my.sprite.rightArm.flipY = true;

        // Legs
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_whiteC.png");     
        my.sprite.leftLeg.flipX = true; 
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_whiteC.png");     

        // Eyes
        my.sprite.Eye = this.add.sprite(this.EyeX, this.EyeY, "monsterParts", "eye_red.png");
        my.sprite.Eye.flipX = true;

        // Mouths
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouth_closed_happy.png");
        my.sprite.fangs = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthB.png");
        my.sprite.fangs.visible = false;
        
        // Horns
        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_red_horn_small.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_red_horn_small.png");

        // Polling keybinds
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Event keybinds
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // Event: fangs
        keyF.on('down', (key, event) => {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        });

        // Event: smile
        keyS.on('down', (key, event) => {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        });
    }  

    update() {
        let my = this.my;    // create an alias to this.my for readability
        const rate = 0.5;

        // Slowly move the monster left
        if (this.keyA.isDown) {
            for (let bodyParts in my.sprite) {
                my.sprite[bodyParts].x -= rate;
            }

        }

        // Slowly move the monster right
        if (this.keyD.isDown) {
            for (let bodyParts in my.sprite) {
                my.sprite[bodyParts].x += rate;
            }

        }
    }

}