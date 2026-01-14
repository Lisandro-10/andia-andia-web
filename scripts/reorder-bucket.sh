#!/bin/bash
# reorganize-s3-images.sh

BUCKET="estudioandia-web-assets"
PREFIX="projects"

echo "🔄 Reorganizando imágenes en S3..."

# Listar todos los proyectos
projects=$(aws s3 ls s3://$BUCKET/$PREFIX/ | awk '{print $2}' | sed 's#/##')

for project in $projects; do
    echo "📁 Procesando: $project"
    
    # Listar archivos directamente en la carpeta del proyecto (no en subdirectorios)
    images=$(aws s3 ls s3://$BUCKET/$PREFIX/$project/ --recursive | \
             grep -E '\.(webp|jpg|png|mp4|webm)$' | \
             grep -v 'gallery/' | \
             awk '{print $4}')
    
    if [ -z "$images" ]; then
        echo "   ✅ Ya está organizado"
        continue
    fi
    
    # Mover cada imagen a gallery/
    for img_path in $images; do
        if [ -n "$img_path" ]; then
            filename=$(basename "$img_path")
            new_path="$PREFIX/$project/gallery/$filename"
            
            echo "   📦 $filename → gallery/"
            aws s3 mv s3://$BUCKET/$img_path s3://$BUCKET/$new_path --quiet
        fi
    done
done

echo ""
echo "✅ Reorganización completa"
echo ""
echo "🔍 Verificando estructura:"
aws s3 ls s3://$BUCKET/$PREFIX/ --recursive | head -20