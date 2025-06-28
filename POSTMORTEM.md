# Postmortem - Incident de déploiement

**Date de l'incident :** 2025-06-25  
**Durée de l'incident :** 2 heures  
**Services impactés :** Observability-app (dashboard Grafana inaccessible)  

---

## Description de l’incident

Lors du déploiement de la nouvelle version du service observability-app, une mauvaise configuration du fichier `docker-compose.yml` a provoqué un arrêt inopiné du service Grafana. Ce problème a empêché les utilisateurs d'accéder au dashboard pendant environ 2 heures.

---

## Causes racines

- Mauvaise gestion des volumes dans `docker-compose.yml` entraînant la perte de données persistantes.
- Absence de test de montée en charge et de validation post-déploiement.
- Pas de procédure claire pour rollback rapide.

---

## Impact

- Dashboard inaccessible pendant 2 heures.
- Retard dans la prise de décision basée sur les métriques.
- Impact mineur sur les équipes techniques, aucune perte de données critique.

---

## Actions correctives immédiates

- Redéploiement du service avec la configuration correcte.
- Restauration des volumes sauvegardés.
- Notification rapide des équipes concernées.

---

## Plan d’amélioration pour éviter la récurrence

1. **Mise en place d’une procédure de validation de déploiement** (tests automatisés de montée en charge et de validation post-déploiement).  
2. **Automatisation des sauvegardes des volumes Docker** avant tout déploiement.  
3. **Implémentation d’un mécanisme de rollback rapide** dans la pipeline CI/CD.  
4. **Formation de l’équipe sur la gestion des volumes Docker et la résilience des services.**  
5. **Monitoring renforcé avec alertes automatiques** en cas d’indisponibilité du service.

---

## Conclusion

Cet incident a permis de mettre en lumière un point faible dans notre processus de déploiement. Les actions mises en place permettront de mieux sécuriser nos prochaines mises à jour et d'améliorer la disponibilité de nos services.

---

*Rédigé par [TonNom], 26 juin 2025*
