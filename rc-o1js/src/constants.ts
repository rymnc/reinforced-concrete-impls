export const rcConstants = {
    // round constants for concrete generated by referring to the paper
    // "The elements are certain pseudo-random constants, generated using e.g. Shake-128 with rejection sampling."
    pallasP: 0x40000000000000000000000000000000224698fc094cf91b992d30ed00000001n,
    // round constants for concrete
    concreteConstants: [
        0x3b76e2c5353a723531330bad061b6f028af7562ce7a6bcb62f98cec33c60642an,
        0x18aabe9070d8b26a752d7143f62a5f0110d1a8678666312bb32da390aa46268bn,
        0x2eae05d03caf9b532a7b1fe710fa0ac7c1e845c537c1dbab7f30e5ab71551391n,
        0x3bf5cb8ebc515daa814f42d9071e337998e5a9a9199c07660740c4fc97af738bn,
        0x3c564669611ee74871a85d3597d6ac90cffce9afdbd26c86e06039e933b64a38n,
        0x15036e7c11b7162ddf886228a34273d2660dd687142fc2dc7adaf17892e2d241n,
        0x293f3dbc5f223e6aed222dcbfe2eb93cedd3fa476907d5fd4f3236abbc66737en,
        0x3ee07cebdbc00a2b565ee158caa4b4e920e335533d510e56f801cacb2f4ac134n,
        0x2abf7a943e4c7e39ca0f4e6225235c9cbc8f5851464dd648fbac0037a5c9f811n,
        0x2dd08aa6e50fc61e20200a043810be6356865a6be3af7df69bf5b36714a5895bn,
        0x1f8a827b20d84f0093ad0a6168e5078aae0b2a73e39aaf23d441d37d3d26d303n,
        0x282d52a9b41bc7eec042311eedea5b6bc7daba004ffd247b2e0663dceca3f473n,
        0x38480a420ba9663f176e4dfdf4bd2610b053cfb24031c4bc96604b37ad5f4583n,
        0x27809da6df278b505231f72d0369258c0aff270de5dfa5ff861f884e2d48fca8n,
        0x04fdcb6a9492d654f845a089f50452107293189586f01399e6a5f0cdec581e2dn,
        0x27771ec0fb189df6b3031abdef45998f18d2e1bbbe03d6cddb610f7299009fcen,
        0x12d357da8bb4091e438ad55519bc41f363d2a3f44c4e643b8ef8a1b28d266a97n,
        0x07695da5638e587c637c80cb5e169fc60f4b88b6dff4a4244e4f3210172a11fdn,
        0x34590ddd8a93c3fe7c7d39546aab1c9b7e8835e1637813cc213db018ad52f671n,
        0x19fc0b65e65efc95e23a2c924153044e01a75153d260e42ad0623a0a01eb9887n,
        0x369c8d6e5816098110f3867590a3913ec6c00a549bb11e8e09061ad2107b1216n
    ],
    // divisors for the recursive decomposition in the bars layer
    divisors: [
        673n, 678n, 667n, 683n, 680n, 655n,
        683n, 683n, 681n, 683n, 675n, 668n,
        675n, 677n, 680n, 681n, 669n, 683n,
        681n, 677n, 668n, 654n, 663n, 666n,
        656n, 658n, 651n
    ],
    // same as divisors, after optimizing the operation
    // multipliers for the recursive composition in the bars layer
    si: [
        673n, 678n, 667n, 683n, 680n, 655n,
        683n, 683n, 681n, 683n, 675n, 668n,
        675n, 677n, 680n, 681n, 669n, 683n,
        681n, 677n, 668n, 654n, 663n, 666n,
        656n, 658n, 651n
    ],
    // the lookup table for the sbox between decomposition and composition
    sbox: [
        377n,
        222n,
        243n,
        537n,
        518n,
        373n,
        152n,
        435n,
        526n,
        352n,
        2n,
        410n,
        513n,
        545n,
        567n,
        354n,
        405n,
        80n,
        233n,
        261n,
        49n,
        240n,
        568n,
        74n,
        131n,
        349n,
        146n,
        278n,
        330n,
        372n,
        43n,
        432n,
        247n,
        583n,
        105n,
        203n,
        637n,
        307n,
        29n,
        597n,
        633n,
        198n,
        519n,
        95n,
        148n,
        62n,
        68n,
        312n,
        616n,
        357n,
        234n,
        433n,
        154n,
        90n,
        163n,
        249n,
        101n,
        573n,
        447n,
        587n,
        494n,
        103n,
        608n,
        394n,
        409n,
        73n,
        317n,
        305n,
        346n,
        562n,
        262n,
        313n,
        303n,
        550n,
        64n,
        102n,
        259n,
        400n,
        495n,
        572n,
        238n,
        40n,
        612n,
        236n,
        586n,
        15n,
        361n,
        386n,
        138n,
        136n,
        107n,
        33n,
        190n,
        423n,
        176n,
        161n,
        460n,
        35n,
        202n,
        589n,
        32n,
        160n,
        444n,
        517n,
        490n,
        515n,
        144n,
        195n,
        269n,
        332n,
        25n,
        308n,
        192n,
        276n,
        623n,
        180n,
        626n,
        217n,
        329n,
        66n,
        392n,
        431n,
        12n,
        478n,
        67n,
        232n,
        258n,
        355n,
        94n,
        191n,
        632n,
        181n,
        298n,
        1n,
        301n,
        79n,
        618n,
        523n,
        627n,
        484n,
        306n,
        610n,
        635n,
        619n,
        544n,
        420n,
        408n,
        158n,
        328n,
        61n,
        406n,
        299n,
        442n,
        178n,
        625n,
        621n,
        497n,
        465n,
        574n,
        143n,
        54n,
        57n,
        89n,
        322n,
        135n,
        96n,
        605n,
        599n,
        473n,
        97n,
        85n,
        133n,
        200n,
        93n,
        291n,
        525n,
        529n,
        206n,
        614n,
        319n,
        196n,
        482n,
        17n,
        168n,
        70n,
        104n,
        441n,
        159n,
        364n,
        603n,
        78n,
        150n,
        230n,
        116n,
        31n,
        630n,
        132n,
        69n,
        499n,
        532n,
        218n,
        492n,
        112n,
        505n,
        437n,
        333n,
        457n,
        456n,
        439n,
        639n,
        398n,
        16n,
        436n,
        264n,
        450n,
        211n,
        241n,
        524n,
        294n,
        235n,
        126n,
        165n,
        527n,
        452n,
        212n,
        157n,
        272n,
        208n,
        469n,
        611n,
        338n,
        83n,
        326n,
        151n,
        139n,
        607n,
        285n,
        585n,
        58n,
        14n,
        193n,
        71n,
        440n,
        511n,
        542n,
        390n,
        470n,
        155n,
        413n,
        606n,
        142n,
        367n,
        371n,
        174n,
        5n,
        60n,
        289n,
        297n,
        336n,
        370n,
        76n,
        209n,
        622n,
        453n,
        257n,
        555n,
        44n,
        430n,
        345n,
        335n,
        548n,
        459n,
        47n,
        426n,
        591n,
        559n,
        417n,
        284n,
        552n,
        137n,
        277n,
        281n,
        463n,
        631n,
        350n,
        265n,
        323n,
        108n,
        290n,
        169n,
        634n,
        609n,
        414n,
        130n,
        6n,
        166n,
        316n,
        207n,
        592n,
        280n,
        391n,
        274n,
        20n,
        300n,
        593n,
        549n,
        3n,
        602n,
        418n,
        472n,
        419n,
        296n,
        41n,
        46n,
        615n,
        638n,
        388n,
        553n,
        282n,
        356n,
        327n,
        462n,
        115n,
        325n,
        121n,
        399n,
        273n,
        334n,
        383n,
        488n,
        292n,
        55n,
        628n,
        9n,
        19n,
        601n,
        496n,
        228n,
        201n,
        576n,
        374n,
        558n,
        153n,
        162n,
        341n,
        353n,
        84n,
        220n,
        461n,
        221n,
        547n,
        344n,
        507n,
        577n,
        140n,
        485n,
        471n,
        11n,
        175n,
        13n,
        53n,
        543n,
        270n,
        120n,
        30n,
        584n,
        384n,
        368n,
        397n,
        239n,
        4n,
        483n,
        620n,
        189n,
        522n,
        540n,
        510n,
        149n,
        245n,
        533n,
        283n,
        256n,
        369n,
        302n,
        571n,
        128n,
        253n,
        448n,
        446n,
        183n,
        99n,
        438n,
        468n,
        42n,
        594n,
        487n,
        403n,
        23n,
        172n,
        340n,
        106n,
        481n,
        251n,
        363n,
        295n,
        489n,
        474n,
        337n,
        87n,
        86n,
        246n,
        215n,
        376n,
        315n,
        415n,
        117n,
        286n,
        600n,
        56n,
        145n,
        91n,
        358n,
        429n,
        411n,
        516n,
        310n,
        213n,
        598n,
        10n,
        395n,
        111n,
        506n,
        237n,
        170n,
        512n,
        82n,
        147n,
        579n,
        402n,
        501n,
        343n,
        38n,
        434n,
        214n,
        314n,
        360n,
        77n,
        565n,
        320n,
        385n,
        404n,
        199n,
        331n,
        351n,
        466n,
        596n,
        365n,
        231n,
        477n,
        604n,
        254n,
        268n,
        539n,
        424n,
        167n,
        378n,
        491n,
        535n,
        141n,
        267n,
        177n,
        27n,
        546n,
        219n,
        556n,
        216n,
        451n,
        387n,
        28n,
        50n,
        569n,
        255n,
        288n,
        156n,
        449n,
        379n,
        508n,
        528n,
        531n,
        624n,
        581n,
        554n,
        59n,
        171n,
        252n,
        0n,
        595n,
        185n,
        51n,
        520n,
        575n,
        475n,
        113n,
        187n,
        194n,
        428n,
        500n,
        617n,
        188n,
        321n,
        179n,
        263n,
        110n,
        467n,
        18n,
        401n,
        22n,
        164n,
        342n,
        21n,
        382n,
        381n,
        127n,
        52n,
        570n,
        45n,
        445n,
        36n,
        534n,
        339n,
        98n,
        293n,
        244n,
        266n,
        629n,
        229n,
        122n,
        123n,
        48n,
        88n,
        225n,
        173n,
        100n,
        114n,
        536n,
        636n,
        205n,
        34n,
        425n,
        502n,
        514n,
        304n,
        613n,
        530n,
        118n,
        75n,
        561n,
        582n,
        81n,
        480n,
        92n,
        498n,
        464n,
        224n,
        479n,
        563n,
        223n,
        640n,
        521n,
        427n,
        503n,
        250n,
        375n,
        186n,
        72n,
        242n,
        125n,
        380n,
        271n,
        204n,
        407n,
        366n,
        197n,
        119n,
        7n,
        493n,
        26n,
        109n,
        65n,
        359n,
        396n,
        311n,
        309n,
        458n,
        134n,
        393n,
        557n,
        476n,
        324n,
        421n,
        275n,
        37n,
        39n,
        580n,
        184n,
        560n,
        8n,
        455n,
        509n,
        422n,
        24n,
        287n,
        590n,
        182n,
        416n,
        318n,
        260n,
        578n,
        454n,
        389n,
        129n,
        566n,
        63n,
        486n,
        541n,
        362n,
        210n,
        551n,
        348n,
        279n,
        538n,
        347n,
        504n,
        124n,
        564n,
        443n,
        412n,
        226n,
        227n,
        248n,
        588n,
        641n,
        642n,
        643n,
        644n,
        645n,
        646n,
        647n,
        648n,
        649n,
        650n,
        651n,
        652n,
        653n,
        654n,
        655n,
        656n,
        657n,
        658n,
        659n,
        660n,
        661n,
        662n,
        663n,
        664n,
        665n,
        666n,
        667n,
        668n,
        669n,
        670n,
        671n,
        672n,
        673n,
        674n,
        675n,
        676n,
        677n,
        678n,
        679n,
        680n,
        681n,
        682n
    ],
}