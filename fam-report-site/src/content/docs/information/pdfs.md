---
title: "Automated PDF Downloading and Processing"
description: "Docs intro"
---

As a part of the in-depth analysis and evaluation of Fampay, we implemented an automated system to download and catalog a collection of PDF documents. These files, which we obtained from a curated list of URLs stored in a CSV file (`pdf_links.csv`), could include a variety of information crucial to understanding Fampay's transparency and visibility as a company.

### The Python Script

The Python script features a function `download_pdf_file(url: str)` which, when provided a URL string of a PDF, sends a request to download the document. Once the response from the request is received, the script verifies that the request was successful (HTTP status code 200). If the PDF file is retrieved successfully, the script saves the file in the current working directory and prints a success message. In case of a failure, an appropriate message gets printed.

After defining the function, the script reads the `pdf_links.csv` file, which contains the URLs of the PDF files to be downloaded. The script iterates over each URL, attempting to download the corresponding PDF file. If an error occurs during the download, the script prints a message including the URL that failed and the specific error that was encountered.

<div style="overflow: auto; height: 500px;">
<pre>
https://www.idfcfirstbank.com/content/dam/IDFCFirstBank/PDF/FAQs-Fampay.pdf
https://www.idfcfirstbank.com/content/dam/IDFCFirstBank/PDF/FamPay-tnc.pdf
https://cdn.fampay.in/prod/Terms+and+conditions/GRIPtnc.pdf
https://triotech-website.s3.ap-south-1.amazonaws.com/public/FamPay+TT+-+Terms+of+Use.pdf
https://s3.ap-south-1.amazonaws.com/zeta-website-images-prod/images/pdf/Press-Release-Zeta-Fusion-power-FamPays-Cashless-Payments-GenZ-21-Oct.pdf
https://www.bankofbaroda.in/-/media/project/bob/countrywebsites/india/pdfs/993_1_fintalk_01-08-2021.pdf
https://www.bankofbaroda.in/writereaddata/Portal/Fintalk/857_1_Fintalk-20-10-2020.pdf
https://cdn.twimbit.com/uploads/2022/07/26173739/India-new-hub-of-neobank-2.0-V2.pdf
https://cdn.twimbit.com/uploads/2021/06/15130623/CX-Benchmark_Top-13-Neobanks-ep2_-1.pdf
https://blog.zeta.tech/hubfs/Banking/Business%20Today%20-%20Zeta(Best%20Fintech).pdf
https://icmai.in/upload/BI/DND_3007_21.pdf
https://techshila.co.in/static/media/Product.2c0330fb28649c5496fc.pdf
https://www.jsalaw.com/wp-content/uploads/2021/08/JSA-Newsletter-FinTech-Eleventh-Edition-2021-002.pdf
https://www.msit.in/media/2022/06/22/placements-2021-22.pdf
https://www.indembassybern.gov.in/docs/1587040163IBW%2016.03.2020.pdf
https://ir.iitr.ac.in/pdf/IITR_Brochure_2023.pdf
https://www.scmc.edu.in/web-assets/pdf/Placement-Data.pdf
https://aitikgupta.com/Aitik_Gupta_SWE_Resume.pdf
https://calcuttabusinessschool.org.in/assets/pdf/UDYOGPATRA-Issue-No-29.pdf
https://files.eric.ed.gov/fulltext/ED392849.pdf
https://www.satpaulmittalschool.org/web/downloads/newsletter_day_2.pdf
https://www.svc.ac.in/SVC_MAIN/SeminarsWebinars/Diamond%20Jubilee%20Celebration%20(2).pdf
https://www.mirandahouse.ac.in/placementcell/files/Self%20attested%20list%20of%20students.pdf
https://id.bits-pilani.ac.in/uploads/Hyd%20companies%20202021.pdf
https://www.bits-pilani.ac.in/Uploads/University_Upload/Placement/Employer-and-Internship-list-GER-20-April-2022.pdf
https://apspune.com/Documents/Newsletters/Newsletter-September%202022.pdf
https://iea.blob.core.windows.net/assets/imports/events/339/Session_3_Vincent.pdf
https://www.pwc.in/assets/pdfs/consulting/financial-services/fintech/point-of-view/pwcs-fintech-insights-july-2021.pdf
https://www.pnbhousing.com/wp-content/uploads/2015/07/Appointment-of-Mr-Gauri-Shankar.pdf
https://aspirecircle.org/wp-content/uploads/2022/01/Tracxn-Feed-Report-FinTech-India-29-Jul-2021-FIN.pdf
https://pbindustries.gov.in/startup/assets/docs/21_July_2022.pdf
https://pdf.bankexamstoday.com/raman_files/Banking-and-Financial-Awareness-Digest-July-2021.pdf
https://cdn.codingal.com/pdfs/fampay-promo/coding-prodigy-curriculum.pdf
https://rbsa.in/wp-content/uploads/reports/Newsletters/RBSA_India_Deals_Spanshot_March2020.pdf
https://repository.ung.ac.id/get/karyailmiah/8260/The-Analysis-of-Marketing-Strategy-to-Improve-the-Competitive-Positioningof-the-Craft-Industry-in-Gorontalo.pdf
https://nucleusadvisors.in/blog_pdf/643-file21636535916.pdf
https://pmschool.io:4000/pdfs/entry-file-1627232659532.pdf
https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/Recognized%20Startups%20List_31072020.pdf
https://www.purbamedinipurpolice.gov.in/wp-content/uploads/EGRA-97.pdf
https://www.ripleys.com/wp-content/uploads/formidable/14/amazon-free-gift-card-2023-31049790.pdf
https://admi.mu.ac.in/media/placement-reports/List%20of%20Corporate%20Recruiters%202020%20-%2021.pdf
https://www.anz.com/Documents/AU/corporate/global-transaction-hth-file-formats.pdf
https://byjusexamprep.com/liveData/f/2020/7/daily_gk_quiz_23rd_july_2020_79.pdf
https://www.unicef.org/media/134571/file/India-Humanitarian-SitRep-Dec-2022.pdf
https://www.bankersadda.com/wp-content/uploads/2020/09/12135837/SA-Quiz-PDF-12-Sept-Copy.pdf
https://rithikjain.in/static/media/resume.f184a744.pdf
https://ibbi.gov.in/uploads/auction_notice_liquidation/182bc6e9639a9259da3e8453706353d4.pdf
https://www.gapinterdisciplinarities.org/res/articles/(27-33)%20NEO%20BANKING%20AN%20INNOVATIVE%20WINDOW%20OF%20BANKING%20ARENA.pdf
https://www.smartkeeda.com/pdf/July_GA_Quiz_30.pdf
https://www.tnpscthervupettagam.com/assets/home/media/general/doc/April_29_-_Eng.pdf
https://www.gunder.com/content/uploads/pdf/jonathan-pentzien.pdf
https://www.ipindia.gov.in/writereaddata/Portal/IPOJournal/1_4898_1/NOTICE_RELATED_TO_OPPOSITION-NOTICE.pdf
https://hr.mcmaster.ca/app/uploads/2022/08/2022-08-17-HR-Network-Presentation-.pdf
https://induslaw.com/app/webroot/publications/pdf/alerts-2021/Fintech-Newsletter-April-to-June-2021.pdf
https://tpcell.iiitkota.ac.in/docs/placement-report-2022.pdf
https://paymentscouncil.in/pdf/PCI_FCC_Annual_Report_2021_22.pdf
https://www.lpu.in/student_services/downloads/lovely-world/october2022-issue.pdf
https://www.time4education.com/GKmodules/2020/07_July_2020_Current_Affairs.pdf
https://www.careersuccessjammu.com/login/images/190874751619-20%20july%202020-converted.pdf
https://bsmedia.business-standard.com/_media/bs/data/market-reports/equity-brokertips/2023-04/16823033450.89992300.pdf
https://nmcollege.in/wp-content/uploads/2021/08/college-magazine_final.pdf
https://placement.iiita.ac.in/Placement_Brochure_2022-23.pdf
https://www.mani-group.com/wp-content/uploads/2021/07/Forbes-India-30th-July-2021_Online.pdf
https://www.ijirmf.com/wp-content/uploads/IJIRMF202303003-min.pdf
https://enterprise.press/wp-content/uploads/2021/11/VentureSouq-launches-the-MENA-regions-first-FinTech-Fund.pdf
https://www.pws.edu.in/images/images2020nov/PWS-Newsletter%20_September-Edition.pdf
https://www.cibgp.com/article_18446_993a81a0a87a17ef3477215806228540.pdf
https://vanik.org/uploads/1664-news%20development%2021%20JULY%20-23%20JULY%20%202020.pdf
https://www.orfonline.org/wp-content/uploads/2022/01/ORF_SpecialReport_178_DigitalBanks.pdf
https://amlegals.com/wp-content/uploads/2022/05/Quarterly-Repository-April-2022.pdf
https://www.iemias.com/wp-content/uploads/2021/06/8.-One-Liner-CA-AUGUST-2020.pdf
https://player.uacdn.net/slides_pdf/0FDQ5F3S6SR35R1VQ0A0/Discussion_on_Current_Affairs_for_the_month_of_July_Part_3_with_anno.pdf
https://ambitiousbaba.com/wp-content/uploads/2020/11/Banking-and-Financial-Awareness-Class-2-PDF-for-RBI-Assistant-Mains.pdf
https://darkeoh-auditor.ddti.net/media/11620/unclaimed-money-as-of-7-1-22.pdf
https://bmsit.ac.in/public/assets/pdf/newsletters/June-2022.pdf
https://narula.dev/assets/LoRNamanNarula.pdf
https://www.symlaw.ac.in/assets/pdf/Symbiosis%20Law%20School-Pune-%202023-%20E-Brochure.pdf
https://www.gla.ac.in/pdf/admission-booklet-2021.pdf
https://melbourneinstitute.unimelb.edu.au/__data/assets/pdf_file/0005/2245928/manualmitts5.pdf
https://knowvation.in/wp-content/uploads/2021/01/apps_2020_2021.pdf
https://vidhilegalpolicy.in/wp-content/uploads/2022/04/The-Law-Needs-to-Account-for-Her_Reforms-to-make-finance-inclusive.pdf
https://www.placementhansraj.com/internshipcell/files/The%20Internship%20Cell%20-%20Annual%20Report.pdf
https://ece.mait.ac.in/images/pdf/Placement_2018-2022.pdf
https://unstop.com/api/competition/get-attachment/60c3a1c730208_Xartup_Fellowship_Curriculum_21.pdf
https://www.redalyc.org/pdf/3943/394334972003.pdf
https://yourstory.com/cs/uploads/Tech50Report20212-1635577714107.pdf
https://www.fintechfutures.com/files/2021/07/Banking-Technology-Jul-Aug-2021.pdf
https://www.tutorialspoint.com/current_affairs_july_2020/current_affairs_july_2020_pdf_version.pdf
https://www.jmflresearch.com/JMnew/JMCRM/analystreports/pdf/%5BJMFL%5D%20India%20Internet_Digital%20Payments_SectorUpdate_16Sep2020.pdf
https://www.dfreeindia.com/college/brocher/bro-1635412942-1673196736.pdf
https://acuproconsulting.com/docs/newsletters/2021/06)%20June%202021/Startup's%20The%20Buzz%20-%2021%20June%202021.pdf
https://www.greenhonchos.com/wp-content/uploads/2022/04/Tech50-Report-2022.pdf
https://www.hansrajcollege.ac.in/uploads/studentscorner/internship/The%20Internship%20Cell%20-%20Annual%20Report%20(1).pdf
https://assessmentonline.naac.gov.in/storage/app/hei/SSR/103790/3.1.3_1619962684_5615.pdf
https://static1.squarespace.com/static/6454d2c5a7800f4a6e1218d6/t/6455f5b3afc0820da338ce58/1683355060308/xanisokikami.pdf
https://images.assettype.com/bloombergquint/2021-10/493b78de-2f92-497e-a86d-6379864c0238/Systematix_India_FinTech___Neo_Banks.pdf
https://iimamritsar.ac.in/uploads/IIM%20Amritsar_Junior_Profiles%20Brochure%20Final%20__230921.pdf
https://ijalr.in/wp-content/uploads/2022/09/Article-36.pdf
https://www.mbauniverse.com/sites/default/files/SIIB_Brochure_2022.pdf
https://www.fintechcouncil.in/pdf/The%20Winds%20of%20Change-%20Edition%20II.pdf
https://www.seiburailway.jp/railways/ad/signage/station/pdf/SEIBU_mediaguide2023_book_27-28.pdf
https://www.ifheindia.org/IFHE_Annual%20Report_2020-21.pdf
https://noida.cambridgeschool.edu.in/wp-content/uploads/sites/4/2020/09/MONTHLY-REPORT-JULY-2020.pdf
https://cdn.pratikd.in/resume-may-21.pdf
https://static.seekingalpha.com/uploads/sa_presentations/223/93223/original.pdf
https://auditor.loanwiser.in/bank_statement/amol51630483783.pdf
https://www.iimcal.ac.in/sites/all/files/pdfs/9_th_anniversary_issue_september_2021_.pdf
https://tsec.edu/wp-content/uploads/2021/NAAC/3.2.2.B.pdf
https://www2.deloitte.com/content/dam/Deloitte/th/Documents/international-specialist-services/th-iss-jsg-fa-deloitte-thailand-jsg-webinar-28052020.pdf
https://www.careerpower.in/2020/The_Hindu_Review_July_2020.pdf
https://www.ark.ac.uk/nilt/2015/main15.pdf
https://www.grantthornton.in/globalassets/1.-member-firms/india/assets/pdfs/annual-deal-list-2021.pdf
https://www2.erie.gov/clarence/sites/www2.erie.gov.clarence/files/uploads/ZBA%206-8-2021%20support%20docs%20No.%205%20last%20half-05282021145805.pdf
https://www.bseindia.com/xml-data/corpfiling/AttachHis/c7a18e1b-ca8f-4275-abe7-a0fe046dda57.pdf
https://docs.oracle.com/cd/E74288_01/docs/RN_GAIO_311releasenotesv1.1.pdf
https://library.bsl.org.au/jspui/bitstream/123456789/372/1/melbourne%20institute%20working%20paper%20no%2016_01.pdf
https://careerflite.com/wp-content/uploads/2021/08/G.K.-Mania-Career_Flite-August-2020.pdf
https://www.coa.gov.ph/download/4321/south-cotabato/54982/banga-executive-summary-2014-2.pdf
https://bbpsrohini.balbharati.org/wp-content/uploads/118-SMC-WEBSITE.pdf
http://www3.stpgov.org/agenda/20-sep23/attachments/230e89db99ca407aba4fa82ac24045d6/6242/594.pdf
https://townofcenter.colorado.gov/sites/townofcenter/files/documents/09-08-20%20-%20TOC%20Board%20Meeting%20Agenda-3.pdf
https://scc.spokane.edu/SCC/media/SCC/amazon-prime-gift-cards-vouchers-promotional-codes-72735530.pdf
</pre>
</div>

### Visibility and Transparency Metrics

The documents that have been downloaded in this process serve as critical resources in evaluating Fampay's transparency and visibility. Transparency in a company can be measured by the amount and quality of information it makes available to the public. This could include:

*   Regulatory filings and compliance documents
*   Financial statements and performance metrics
*   Organizational structure and operational details
*   Policies and procedures
*   Corporate governance records

These documents often come in PDF format, hence the necessity of downloading and analyzing numerous PDF files.

The collected PDFs can be further analyzed to gather insights into Fampay's operations, financial status, compliance with regulations, and other key aspects. The more transparent a company is with its data, the more trust it can build with its stakeholders, making this analysis critical for any company evaluation.