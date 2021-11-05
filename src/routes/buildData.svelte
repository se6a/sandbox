<script context="module">
  import lp21_data from "../data/lp21-competencies-filtering";

  const sorted = {};
  const failed = [];

  lp21_data.forEach((itm) => {
    let fachbereich =
      itm?.Fachbereich?.bezeichnung ||
      itm?.["Handlungs-Themenaspekt"]?.bezeichnung;
    let kompetenzbereich = itm?.Kompetenzbereich?.bezeichnung;
    let kompetenz = itm?.Kompetenz?.bezeichnung || itm.title;

    if (!fachbereich || !kompetenzbereich || !kompetenz) {
      failed.push(itm);
      return;
    }

    if (!sorted?.[fachbereich]) {
      sorted[fachbereich] = {};
    }

    if (!sorted[fachbereich]?.[kompetenzbereich]) {
      sorted[fachbereich][kompetenzbereich] = {};
    }

    if (!sorted[fachbereich][kompetenzbereich]?.[kompetenz]) {
      sorted[fachbereich][kompetenzbereich][kompetenz] = itm.kompetenz || itm;
    }
  });

  const sorted_json = JSON.stringify(sorted);
  console.log("SORTED", sorted_json);
  console.log("FAILED", failed);
</script>
