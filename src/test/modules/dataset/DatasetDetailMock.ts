export class DatasetDetailMock {
    public static datasetDetail = '{\n' +
        '  "id": "PXD001333",\n' +
        '  "source": "pride",\n' +
        '  "name": "Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC",\n' +
        '  "description": "At a pH > 5,  phosphopeptides have two negative charges per residue and are well-retained in anion-exchange chromatography.  However, the peptides with one or two phosphate groups are not separated from the peptides with multiple Asp or Glu residues, which interfere with the identification of phosphopeptides in tryptic digests.  At a pH around 2, phosphate residues have just a single negative charge but Asp and Glu have none.  This facilitates the separation of phosphopeptides from unmodified acidic peptides.  The singly phosphorylated peptides are retained too weakly under these conditions, due to electrostatic repulsion, unless hydrophilic interaction is superimposed in the ERLIC mode (electrostatic repulsion-hydrophilic interaction chromatography).  Weak anion-exchange (WAX) and strong anion-exchange (SAX) columns were compared, both with peptide standards and with a complex tryptic digest.  The SAX column exhibited higher capacity at pH 6 than did the WAX column.  However, only about 60% as many phosphopeptides were identified at pH 6 than via ERLIC at pH 2.  In one run, 12,467 phosphopeptides were identified, including 4233 with more than one phosphate.  We conclude that chromatography of phosphopeptides is best performed at low pH in the ERLIC mode.  Under those conditions the performances of the SAX and WAX materials were comparable.",\n' +
        '  "keywords": [\n' +
        '    "chromatography ERLIC SAX WAX AEX",\n' +
        '    "Biomedical"\n' +
        '  ],\n' +
        '  "organisms": [\n' +
        '    {\n' +
        '      "acc": "9606",\n' +
        '      "name": "Homo sapiens"\n' +
        '    }\n' +
        '  ],\n' +
        '  "publicationDate": "2015-04-23",\n' +
        '  "publicationIds": [\n' +
        '    "25827581"\n' +
        '  ],\n' +
        '  "protocols": [\n' +
        '    {\n' +
        '      "name": "data_protocol",\n' +
        '      "description": "For peptide identification, the .RAW-files were loaded into Proteome Discoverer (Thermo Fisher Scientific; version 1.4.0.288).  All MS/MS spectra created thereby were searched using MS Amanda [25] against the Swiss-Prot human protein sequence database (www.uniprot.org; retrieved 2014-06-29; 20,581 entries).  The following search parameters were used: carbamidomethylation on cysteine was set as a fixed modification and oxidation on methionine was set as a variable modification as was phosphorylation of serine, threonine and tyrosine.  Monoisotopic masses were searched within unrestricted protein masses for tryptic peptides.  The peptide mass tolerance was set to  8 ppm and the fragment mass tolerance to  20 ppm.  The maximal number of missed cleavages was set to 2.  The result was filtered to 1% FDR using the Percolator algorithm integrated in Proteome Discoverer.  PhosphoRS was applied for phosphorylation site probability estimation."\n' +
        '    },\n' +
        '    {\n' +
        '      "name": "sample_protocol",\n' +
        '      "description": "Sample Preparation: Mitosis-arrested cultured HeLa cells were lysed with 8 M urea and the protein concentration was measured using a Bradford assay. The lysate was reduced and alkylated with DTT and iodoacetamide and then digested with Lys-C and Trypsin. Peptides were enriched from the digestion mixture using reversed-phase (RP) C18 Sep-Pak cartridges (Waters) and the eluate was dried to completion in a vacuum centrifuge.  Phosphopeptide Enrichment HPLC separation was performed on a UltiMate 3000 (Dionex) equipped with a fraction collector. 800 µg samples were fractionated on anion exchange columns (PolySAX LP or PolyWAX LP, PolyLC; 4.6 mm ID x 200 mm, 5 µm particle size, 300 Å pore size) using a binary solvent system of solvent A (for ERLIC separations: 70% acetonitrile, 20 mM sodium methylphosphonate, pH 2.0; for SAX separation: 10% acetonitrile, 20 mM ammonium acetate, pH 6.0) and solvent B (10% acetonitrile, 300 mM triethylammonium phosphate, pH 2.0) delivered at 1 mL/min per the following linear gradient: 5 min at solvent A, then 43 min to 100% solvent B, then 5 min at 100% solvent B. Fractions were collected every 1 min between 0 and 50 min. Two adjacent fractions were pooled and desalted using RP-C18 Sep-Pak cartridges. The eluates were dried to completion in a vacuum centrifuge.  LC-MS/MS Analysis Nano-HPLC-MS/MS was performed on an UltiMate 3000 RSLCnano (Dionex) coupled online to a Q-Exactive (Thermo Fisher Scientific). Fractions were first loaded onto a RP-C18 trap column (Acclaim PepMap Nano-Trap, Dionex; 100 µm inner diameter (ID) x 100 mm, 5 µm particle size, 300 Å pore size) using 25 µL/min solvent C (0.1% trifluoroacetic acid in water) and then separated on a RP C18 column (Acclaim PepMap RSLC, Dionex; 75 µm ID x 500 mm, 2 µm particle size, 100 Å pore size) using a binary solvent system of solvent D (0.1% formic acid in water) and solvent E (80% acetonitrile and 0.1% formic acid in water) delivered at 230 nL/min in one of the following linear gradients: 10 min at 2% solvent D, in 60 min (1 h gradient) or 120 min (2 h gradient) to 35% solvent D, in 5 min to 90% solvent D, 5 min at 90% solvent D. Peptides were ionized by electrospray using coated nanospray emitters (SilicaTip, New Objective; 10 µm tip ID) biased to 1.9 kV. The mass spectrometer was operated in data-dependent acquisition mode with one MS scan followed by 15 sequential MS/MS scans of the most intense precursors. Airborne dodecamethylhexacyclosiloxane was used as lockmass. The MS scan was acquired from 350 to 2000 m/z at a resolution of 70,000, an automatic gain control (AGC) target value of 1,000,000 and a maximal injection time (IT) of 50 ms. Precursor ions with a charge >1 and an intensity >100,000 were selected for MS/MS, which was performed with an isolation width of 2 m/z and a HCD normalized collision energy of 27. The MS/MS scan was acquired at a resolution of 17,500 with a dynamic m/z range, an AGC target value of 100,000 and a maximal IT of 200 ms. Fragmented precursor ions were excluded from fragmentation for 30 s."\n' +
        '    }\n' +
        '  ],\n' +
        '  "instruments": [\n' +
        '    "Q Exactive"\n' +
        '  ],\n' +
        '  "experimentType": [\n' +
        '    "Mass Spectrometry",\n' +
        '    "Shotgun proteomics"\n' +
        '  ],\n' +
        '  "labMembers": null,\n' +
        '  "full_dataset_link": "http://www.ebi.ac.uk/pride/archive/projects/PXD001333",\n' +
        '  "tissues": [\n' +
        '    "Hela Cell"\n' +
        '  ],\n' +
        '  "diseases": [\n' +
        '    "Not Available"\n' +
        '  ],\n' +
        '  "omics_type": [\n' +
        '    "Proteomics"\n' +
        '  ],\n' +
        '  "similars": [\n' +
        '    {\n' +
        '      "accession": "GPM32310019962",\n' +
        '      "database": "GPMDB",\n' +
        '      "omics_type": null,\n' +
        '      "relationType": "Reanalyzed by"\n' +
        '    }\n' +
        '  ],\n' +
        '  "organization": [\n' +
        '    "IMBA - Institute of Molecular Biotechnology"\n' +
        '  ],\n' +
        '  "dates": {\n' +
        '    "publication": [\n' +
        '      "2015-04-23"\n' +
        '    ],\n' +
        '    "submission": [\n' +
        '      "2014-09-17"\n' +
        '    ]\n' +
        '  },\n' +
        '  "submitter": [\n' +
        '    "Otto Hudecz"\n' +
        '  ],\n' +
        '  "submitterMail": [\n' +
        '    "hudecz@imp.univie.ac.at"\n' +
        '  ],\n' +
        '  "labHead": [\n' +
        '    "Andrew Alpert"\n' +
        '  ],\n' +
        '  "labHeadMail": [\n' +
        '    "aalpert@polylc.com"\n' +
        '  ],\n' +
        '  "secondary_accession": null,\n' +
        '  "repositories": [\n' +
        '    "Pride"\n' +
        '  ],\n' +
        '  "citationsCount": 0,\n' +
        '  "connectionsCount": 2,\n' +
        '  "reanalysisCount": 1,\n' +
        '  "viewsCount": 66,\n' +
        '  "scores": {\n' +
        '    "citationCount": 0,\n' +
        '    "reanalysisCount": 1,\n' +
        '    "viewCount": 66,\n' +
        '    "searchCount": 2\n' +
        '  },\n' +
        '  "claimable": true\n' +
        '}';
}
