package test;

import org.json.JSONArray;
import org.json.JSONObject;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;
import uk.ac.ebi.ddi.security.service.DatabaseListService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

/**
 * Created by root on 16.05.17.
 */
public class DatabaseListTest {
    public static void main(String args[]) {
        String text = "[\n" +
                "  {\n" +
                "    \"databaseName\": \"PRIDE\",\n" +
                "    \"title\": \"PRIDE Database\",\n" +
                "    \"source\": \"http://www.ebi.ac.uk/pride/archive/\",\n" +
                "    \"imgAlt\": \"PRIDE logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"pride\\\"\",\n" +
                "    \"description\": \"is a centralized, standards compliant, public data repository for proteomics data, including protein and peptide identifications, post-translational modifications and supporting spectral evidence.\\n\",\n" +
                "    \"image\": \"img/db-logos/pride_logo.jpg\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"EGA\",\n" +
                "    \"title\": \"EGA Database\",\n" +
                "    \"source\": \"https://www.ebi.ac.uk/ega/\",\n" +
                "    \"imgAlt\": \"EGA logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"ega\\\"\",\n" +
                "    \"description\": \"allows you to explore datasets from genomic studies, provided by a range of data providers. Access to datasets must be approved by the specified Data Access Committee (DAC).\\n                                            \",\n" +
                "    \"image\": \"img/db-logos/ega_phenome_logo.jpg\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"MetaboLights\",\n" +
                "    \"title\": \"MetaboLights Database\",\n" +
                "    \"source\": \"http://www.ebi.ac.uk/metabolights/\",\n" +
                "    \"imgAlt\": \"MetaboLignts logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"MetaboLights\\\"\",\n" +
                "    \"description\": \"is a database for Metabolomics experiments and derived information.\",\n" +
                "    \"image\": \"img/db-logos/MetaboLightsLogo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"PeptideAtlas\",\n" +
                "    \"title\": \"PeptideAtlas Database\",\n" +
                "    \"source\": \"http://www.peptideatlas.org/\",\n" +
                "    \"imgAlt\": \"RefSeq logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"PeptideAtlas\\\"\",\n" +
                "    \"description\": \"is a multi-organism, publicly accessible compendium of peptides identified in a large set of tandem mass spectrometry proteomics experiments.\\n\",\n" +
                "    \"image\": \"img/db-logos/PeptideAtlas_Logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"MassIVE\",\n" +
                "    \"title\": \"MassIVE Database\",\n" +
                "    \"source\": \"https://massive.ucsd.edu/ProteoSAFe/datasets.jsp\",\n" +
                "    \"imgAlt\": \"MassIVE logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"MassIVE\\\"\",\n" +
                "    \"description\": \"is a community resource developed by the NIH-funded Center for Computational Mass Spectrometry to promote the global, free exchange of mass spectrometry data.\\n\",\n" +
                "    \"image\": \"img/db-logos/MassIVE_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"Metabolomics Workbench\",\n" +
                "    \"title\": \"Metabolomics Workbench Database\",\n" +
                "    \"source\": \"http://www.metabolomicsworkbench.org/\",\n" +
                "    \"imgAlt\": \"Metabolomics Workbench logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"MetabolomicsWorkbench\\\"\",\n" +
                "    \"description\": \"is a scalable and extensible informatics infrastructure which will serve as a national metabolomics resource.\\n\",\n" +
                "    \"image\": \"img/db-logos/Metabolomics_Workbench_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"GPMDB\",\n" +
                "    \"title\": \"GPMDB Database\",\n" +
                "    \"source\": \"http://gpmdb.thegpm.org/\",\n" +
                "    \"imgAlt\": \"GPMDB logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"GPMDB\\\"\",\n" +
                "    \"description\": \"The Global Proteome Machine Database was constructed to utilize the information obtained by GPM servers to aid in the difficult process of validating peptide MS/MS spectra as well as protein coverage patterns.\\n                                            \",\n" +
                "    \"image\": \"img/db-logos/the_gpm_db_140x105.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"MetabolomeExpress\",\n" +
                "    \"title\": \"MetabolomeExpress Database\",\n" +
                "    \"source\": \"https://www.metabolome-express.org/\",\n" +
                "    \"imgAlt\": \"MetabolomeExpress logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"MetabolomeExpress\\\"\",\n" +
                "    \"description\": \"A public place to process, interpret and share GC/MS metabolomics datasets.\\n\\n\",\n" +
                "    \"image\": \"img/db-logos/metabolome express logo_Mx.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"GNPS\",\n" +
                "    \"title\": \"GNPS Database\",\n" +
                "    \"source\": \"https://gnps.ucsd.edu/ProteoSAFe/static/gnps-splash.jsp\",\n" +
                "    \"imgAlt\": \"GNPS logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"GNPS\\\"\",\n" +
                "    \"description\": \"The Global Natural Products Social Molecular Networking (GNPS) is a platform for providing an overview of the molecular features in mass spectrometry based metabolomics by comparing fragmentation patterns to identify chemical relationships.\\n\",\n" +
                "    \"image\": \"img/db-logos/GNPS_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"ArrayExpress\",\n" +
                "    \"title\": \"ArrayExpress Database\",\n" +
                "    \"source\": \"https://www.ebi.ac.uk/arrayexpress/\",\n" +
                "    \"imgAlt\": \"ArrayExpress logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"ArrayExpress\\\"\",\n" +
                "    \"description\": \"ArrayExpress Archive of Functional Genomics Data stores data from high-throughput functional genomics experiments, and provides these data for reuse to the research community.\\n\",\n" +
                "    \"image\": \"img/db-logos/array_express.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"Expression Atlas\",\n" +
                "    \"title\": \"Expression Atlas Database\",\n" +
                "    \"source\": \"http://www.ebi.ac.uk/gxa/home\",\n" +
                "    \"imgAlt\": \"ExpressioAtlas logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"ExpressionAtlas\\\"\",\n" +
                "    \"description\": \"The Expression Atlas provides information on gene expression patterns under different biological conditions. Gene expression data is re-analysed in-house to detect genes showing interesting baseline and differential expression patterns.\\n\",\n" +
                "    \"image\": \"img/db-logos/expression_atlas.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"BioModels Database\",\n" +
                "    \"title\": \"BioModels Database\",\n" +
                "    \"source\": \"https://www.ebi.ac.uk/biomodels-main/\",\n" +
                "    \"imgAlt\": \"ExpressioAtlas logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"BioModels Database\\\"\",\n" +
                "    \"description\": \"BioModels Database is a repository of computational models of biological processes. Models described from literature are manually curated and enriched with cross-references.\\n\",\n" +
                "    \"image\": \"img/logo/BioModels_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"LINCS\",\n" +
                "    \"title\": \"LINCS\",\n" +
                "    \"source\": \"http://lincsportal.ccs.miami.edu/dcic-portal/\",\n" +
                "    \"imgAlt\": \"LINCS logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"LINCS\\\"\",\n" +
                "    \"description\": \"The Database contains all publicly available HMS LINCS datasets and information for each dataset about experimental reagents (small molecule perturbagens, cells, antibodies, and proteins) and experimental and data analysis protocols.\\n\",\n" +
                "    \"image\": \"img/logo/ldp_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"PAXDB\",\n" +
                "    \"title\": \"PAXDB\",\n" +
                "    \"source\": \"http://www.ebi.ac.uk/gxa/home\",\n" +
                "    \"imgAlt\": \"PAXDB\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"PAXDB\\\"\",\n" +
                "    \"description\": \"PaxDb contains estimated abundance values for a large number of proteins in several different species. Furthermore, you can find information about inter-species variation of protein abundances.\\n                                            \",\n" +
                "    \"image\": \"img/logo/paxdb_logo.png\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"databaseName\": \"JPOST\",\n" +
                "    \"title\": \"JPOST Repository\",\n" +
                "    \"source\": \"http://www.ebi.ac.uk/gxa/home\",\n" +
                "    \"imgAlt\": \"JPOST Repository logo\",\n" +
                "    \"searchUrl\": \"/search?q=*:* AND repository:\\\"JPOST Repository\\\"\",\n" +
                "    \"description\": \"jPOSTrepo (Japan ProteOme STandard Repository) is a new data repository of sharing MS raw/processed data.\\n\",\n" +
                "    \"image\": \"img/logo/jpost.png\"\n" +
                "  }\n" +
                "\n" +
                "]";
        JSONArray databases = new JSONArray(text);
        saveAllDatabase(databases);
    }
    private static void  saveAllDatabase(JSONArray databaseArray){
        DatabaseListService databaseListService = new DatabaseListService();

        for(int i = 0;i<databaseArray.length();i++){
            JSONObject database = databaseArray.getJSONObject(i);
            DatabaseDetail databaseDetail = new DatabaseDetail();
            databaseDetail.setDatabaseName(database.getString("databaseName"));
            databaseDetail.setTitle(database.getString("title"));
            String imageUrl = "profile/src/main/resources/"+database.getString("image");
//            System.out.println(imageUrl);
            File image = new File(imageUrl);
//            System.out.println("****"+image.getAbsoluteFile());
            databaseDetail.setImage(imageToBytes(image));
            databaseDetail.setImgAlt(database.getString("imgAlt"));
            databaseDetail.setSearchUrl(database.getString("searchUrl"));
            databaseDetail.setSource(database.getString("source"));
            databaseDetail.setDescription(database.getString("description"));
            databaseListService.saveDatabase(databaseDetail);
        }
    }
    public static byte[] imageToBytes (File image){
        BufferedImage bufferedImage = null;
        byte[] bytes = null;
        try {
            bufferedImage = ImageIO.read(image);
            ByteArrayOutputStream baos  = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage,"jpg",baos);
            bytes = baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return bytes;
    }

}
